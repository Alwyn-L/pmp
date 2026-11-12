# PMP 制造协同平台 · 生产级 Docker Compose 部署与运维手册（V1.1）

> **适用版本**：Docker Engine ≥ 24.0、Docker Compose v2 ≥ 2.20、Linux x86_64/arm64
> **实测版本**：Ubuntu 22.04 LTS + Docker Engine 29.4.3 + Compose v2（插件版）
> **交付目录**：`deploy/`（编排与配置） + `docs/`（本手册、运维清单）
> **设计依据**：《系统整合架构设计方案-V1.0.md》技术选型、网络分区、等保三级与备份保留 30 天要求

**修订记录**

| 版本 | 日期 | 说明 |
|---|---|---|
| V1.0 | 2026-11-11 | 初版：编排、脚本、多环境模板与验证方案 |
| V1.1 | 2026-11-12 | 补充 192.168.102.242 实际部署档案、快速上线步骤、环境适配实测（8080 端口、MinIO 本地构建、Promtail、Docker 29 自愈语义） |

---

## 零、实际部署档案与快速上线（TL;DR）

### 0.1 已上线环境档案

| 项目 | 实际值 |
|---|---|
| 主机 | 192.168.102.242:22（Ubuntu 22.04 LTS） |
| 部署目录 | `/data/pmp`（编排目录 `/data/pmp/deploy`，属主 `lg:lg`） |
| 访问入口 | http://192.168.102.242:8080/ |
| Compose 项目名 | `pmp`（容器名形如 `pmp-backend-1`） |
| Docker / Compose | Docker Engine 29.4.3 / Docker Compose v2 |
| 运行时 | Java 21.0.13（eclipse-temurin:21-jre-alpine） |
| 服务规模 | 10 个常驻服务 + 1 个一次性任务（`minio-init`） |
| 上线验证 | `bash scripts/verify.sh --full` → 33 项通过 / 0 失败 |
| 特殊适配 | 入口用 8080（80/443 被宿主既有 Dify 占用）；MinIO 镜像本地构建（见第十五章） |
| 观测入口 | Grafana 仅绑定 `127.0.0.1:3000`，需 SSH 隧道访问 |
| 宿主机资源 | 16 GB 内存 / 62 GB 根分区（部署时已用 64%） |

### 0.2 已部署机器的常用入口

```bash
ssh lg@192.168.102.242
cd /data/pmp/deploy

# 状态 / 日志 / 一键验证
docker compose --env-file .env ps
docker compose --env-file .env logs -f --tail=100 backend
bash scripts/verify.sh

# 业务入口与接口自检
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8080/
curl -s http://127.0.0.1:8080/api/v1/dependencies      # 期望 "overall":"UP"

# Grafana（本机 3000 被占用时换 3001）
ssh -L 3000:127.0.0.1:3000 lg@192.168.102.242
# 浏览器打开 http://127.0.0.1:3000
```

> `lg` 已加入 `docker` 组，执行 Docker 命令无需 sudo；系统级操作（改 sysctl、装包）需 `sudo` 并输入该账号密码。

### 0.3 新机器从零部署（摘要）

```bash
# 1) 前置：Docker 24+ / Compose v2，8C16G 以上，磁盘 ≥ 20G 可用
docker version --format '{{.Server.Version}}' && docker compose version --short

# 2) 代码落到约定目录（示例为 /data/pmp）
sudo mkdir -p /data/pmp && sudo chown -R "$USER":"$USER" /data/pmp
git clone <repo> /data/pmp && cd /data/pmp

# 3) 环境变量
cd deploy && cp .env.prod.example .env
vi .env                      # 替换全部 CHANGE_ME；端口冲突时改 HTTP_PORT
chmod 600 .env && bash scripts/preflight.sh

# 4) 构建 → 启动 → 验证
bash scripts/build.sh --pull
bash scripts/start.sh
bash scripts/verify.sh --full
```

通过标准：`verify.sh --full` 失败项为 0，浏览器访问 `http://<IP>:<HTTP_PORT>/` 返回业务首页。详细步骤见第九章，特殊环境适配见第十五章。

### 0.4 交接必读

1. **所有敏感配置只在 `deploy/.env`**，禁止写入编排文件或提交仓库；新成员部署前先向负责人获取口令。
2. **端口以 `.env` 中 `HTTP_PORT` 为准**（当前 8080），排查时勿默认 80。
3. **不要用 `docker kill` 判断自愈能力**：Docker 29+ 会把它当作主动停止，不触发 restart 策略（见 15.4）。

---

## 一、方案总览

### 1.1 架构与网络分区

```
                 Internet / 内网用户
                          │  80/443（唯一对外入口）
        ┌─────────────────▼──────────────────┐
        │ frontend（Nginx 1.27.3）            │  edge 网络
        │ 静态资源 + /api 反向代理 + 安全响应头 │
        └─────────────────┬──────────────────┘
                          │ /api/ → backend:8080
        ┌─────────────────▼──────────────────┐
        │ backend（Spring Boot 3 / Java 21）  │  edge + data + monitor
        └──┬──────────┬──────────┬───────────┘
           │          │          │
      ┌────▼───┐ ┌────▼───┐ ┌────▼────┐ ┌────────┐
      │postgres│ │ redis  │ │  kafka  │ │ minio  │   data 网络（internal）
      └────────┘ └────────┘ └─────────┘ └────────┘   无外网出口
                          │
        ┌─────────────────▼────────────────────────────┐
        │ prometheus + loki + promtail → grafana       │  monitor 网络
        │ grafana 仅绑定 127.0.0.1:3000                │
        └──────────────────────────────────────────────┘
```

三张自定义网络与业务域隔离：

| 网络 | 成员 | 隔离规则 | 用途 |
|---|---|---|---|
| `pmp_edge` | frontend、backend | 可出网（拉取外部依赖） | 接入层与应用层通信 |
| `pmp_data` | backend、postgres、redis、kafka、minio、minio-init | `internal: true`，禁止访问外网 | 数据域，阻断数据外泄与横向扫描 |
| `pmp_monitor` | backend、prometheus、loki、promtail、grafana | 独立网段 | 指标/日志采集，避免混入业务流量 |

### 1.2 交付物清单

| 类别 | 文件 | 说明 |
|---|---|---|
| 编排 | `deploy/docker-compose.yml` | 生产编排（10 个常驻服务 + 1 个一次性初始化任务） |
| 编排 | `deploy/docker-compose.dev.yml` / `.test.yml` | 开发 / 测试叠加编排 |
| 构建 | `deploy/frontend/Dockerfile` | Nginx 静态资源镜像 |
| 构建 | `deploy/backend/Dockerfile` | Maven 多阶段构建 → JRE 运行镜像 |
| 配置 | `deploy/frontend/nginx/nginx.conf`、`templates/default.conf.template` | Nginx 主配置与站点模板（启动时渲染） |
| 配置 | `deploy/backend/src/main/resources/application.yml` | 后端配置（全部敏感项走环境变量） |
| 配置 | `deploy/postgres/init/01-init.sql` | 数据库基线 schema 与自检表 |
| 配置 | `deploy/redis/redis.conf` | Redis 持久化与高危命令禁用 |
| 配置 | `deploy/minio/init-buckets.sh` | 桶创建与版本控制 |
| 可观测 | `deploy/observability/**` | Prometheus / Loki / Promtail / Grafana 数据源 |
| 环境 | `deploy/.env.example`、`.env.dev.example`、`.env.test.example`、`.env.prod.example` | 多环境变量模板，敏感项占位 |
| 脚本 | `deploy/scripts/*.sh` | preflight / build / start / verify / backup / restore / rolling-upgrade |
| 文档 | 本手册、`docs/日常运维与故障排查清单.md` | 部署、运维与排障 |

### 1.3 端口暴露矩阵

| 服务 | 容器端口 | 宿主机映射 | 网络 | 说明 |
|---|---|---|---|---|
| frontend | 8080 | `${HTTP_BIND}:${HTTP_PORT}` → 8080 | edge | **唯一对外入口** |
| backend | 8080 | 不映射 | edge / data / monitor | 仅经 Nginx 访问；`/actuator` 对外返回 404 |
| postgres | 5432 | 不映射 | data | 生产禁止直接暴露 |
| redis | 6379 | 不映射 | data | 强制密码认证 |
| kafka | 9092 / 9093 | 不映射 | data | KRaft 单节点（控制器同进程） |
| minio | 9000 / 9001 | 不映射 | data | 控制台不对外，运维经跳板机 `docker exec` |
| prometheus | 9090 | 不映射 | monitor | 由 Grafana 内网访问 |
| loki | 3100 | 不映射 | monitor | 由 Promtail 内网推送 |
| promtail | 9080 | 不映射 | monitor | 只读挂载容器日志目录 |
| grafana | 3000 | `127.0.0.1:${GRAFANA_PORT}` → 3000 | monitor | 仅本机/堡垒机访问 |

> 开发叠加编排 `docker-compose.dev.yml` 才放开中间件端口，且全部绑定 `127.0.0.1`。
>
> **端口冲突处理**：宿主机 80/443 已被其它业务栈占用时（如本项目的 192.168.102.242 上已有 Dify），只改 `.env` 的 `HTTP_PORT=8080` 即可；frontend 容器内部始终监听 8080，不涉及编排改动。

### 1.4 资源配额基线（`deploy.resources.limits`）

| 服务 | CPU | 内存 | 依据 |
|---|---|---|---|
| frontend | 1.0 | 256 MB | 静态资源 + 代理，内存占用低 |
| backend | 2.0 | 2 GB | JVM 堆按 `MaxRAMPercentage=70` 约 1.4 GB |
| postgres | 2.0 | 2 GB | `shared_buffers=512MB` + 连接池 |
| redis | 1.0 | 1 GB | `maxmemory 768MB` 预留 AOF 重写空间 |
| kafka | 2.0 | 2 GB | 单节点 KRaft |
| minio | 1.0 | 1 GB | 对象存储元数据 + 传输缓冲 |
| prometheus | 1.0 | 1 GB | 15 天保留、约 20 个目标 |
| loki | 1.0 | 1 GB | 7 天日志保留 |
| promtail | 0.5 | 256 MB | 采集代理 |
| grafana | 0.5 | 512 MB | 查询与渲染 |

合计上限约 12.5 vCPU / 12.5 GB，建议宿主机 ≥ 16 vCPU / 32 GB / 500 GB SSD。

---

## 二、前置环境依赖

### 2.1 版本要求

| 组件 | 最低版本 | 推荐 | 校验命令 |
|---|---|---|---|
| Linux 内核 | 4.19 | 5.10+ | `uname -r` |
| Docker Engine | 24.0 | 27.x | `docker version --format '{{.Server.Version}}'` |
| Docker Compose | 2.20 | 2.34+ | `docker compose version --short` |
| 磁盘 | 20 GB 可用 | 500 GB SSD | `df -h /var/lib/docker` |
| 内存 | 8 GB | 32 GB | `free -g` |
| CPU | 4 核 | 16 核 | `nproc` |

### 2.2 宿主机初始化（root 执行一次）

```bash
# 1) 安装 Docker（略，参见官方文档），确认 compose 插件存在
docker compose version

# 2) 文件句柄与内核参数
cat >>/etc/sysctl.d/99-pmp.conf <<'EOF'
fs.file-max = 2097152
net.core.somaxconn = 65535
net.ipv4.tcp_tw_reuse = 1
vm.swappiness = 10
EOF
sysctl --system

cat >>/etc/security/limits.d/99-pmp.conf <<'EOF'
*  soft  nofile  65535
*  hard  nofile  65535
EOF

# 3) 数据盘（示例：单独挂载 /data 并迁移 Docker Root）
systemctl stop docker
mkdir -p /data/docker && rsync -aHAX /var/lib/docker/ /data/docker/
cat >/etc/docker/daemon.json <<'EOF'
{
  "data-root": "/data/docker",
  "log-driver": "json-file",
  "log-opts": { "max-size": "20m", "max-file": "5" },
  "live-restore": true,
  "userland-proxy": false
}
EOF
systemctl start docker

# 4) 时间同步
timedatectl set-ntp true && timedatectl status
```

### 2.3 前置校验

```bash
cd /opt/pmp
bash deploy/scripts/preflight.sh
```

校验项：Docker/Compose 版本、CPU 内存磁盘、`ulimit`、`.env` 占位符与权限、编排与配置模板完整性、`docker compose config` 语法、入口端口占用、NTP 同步。存在 `[FAIL]` 时禁止继续。

---

## 三、镜像构建规则与 Dockerfile 规范

### 3.1 统一规范

1. **基础镜像固定 tag**，禁止 `latest`，升级需变更记录；生产建议同时固定 digest（`image@sha256:...`）。
2. **多阶段构建**：构建依赖（Maven/JDK）不进运行镜像。
3. **非 root 运行**：后端 `uid 10001`，前端 `nginx` 用户；监听端口 > 1024。
4. **只读根文件系统**：运行时仅 `/tmp` 与必要目录可写（tmpfs）。
5. **不把配置与密钥打进镜像**：配置由 compose 挂载，密钥由 `.env` 注入。
6. **HEALTHCHECK 与编排 healthcheck 语义一致**，探针使用容器内已有工具（`wget`/`curl`）。
7. **构建可复现**：`mvn dependency:go-offline` 单独成层；前端构建上下文通过 `.dockerignore` 裁剪。

### 3.2 前端镜像（`deploy/frontend/Dockerfile`）

```bash
docker build -f deploy/frontend/Dockerfile -t pmp/frontend:1.0.0 .
```

- 构建上下文为**仓库根目录**（需复制 `docs/ui-demo` 静态产物）；真实项目替换为 `dist/` 目录。
- 镜像内删除默认 `default.conf`，实际站点配置由挂载模板在启动时渲染，避免"改配置要重新构建"。
- 以 `nginx` 用户运行，`/tmp`、`/etc/nginx/conf.d` 使用 tmpfs。

### 3.3 后端镜像（`deploy/backend/Dockerfile`）

```bash
docker build -f deploy/backend/Dockerfile -t pmp/backend:1.0.0 deploy/backend
```

- 阶段一 `maven:3.9.9-eclipse-temurin-21` 编译打包；阶段二 `eclipse-temurin:21-jre-alpine` 运行。
- 入口使用 `exec java $JAVA_OPTS -jar /app/app.jar`，保证 Java 为 PID 1，可接收 `SIGTERM` 优雅停机（`server.shutdown=graceful`，30s）。
- 内网构建可替换私服基础镜像：`.env` 中设置 `MAVEN_IMAGE` / `JRE_IMAGE`，或通过 `build.args` 传入。

### 3.4 版本与发布

镜像 tag 采用 `主版本.次版本.修订号` 或 `日期-提交号`（如 `1.0.0-20261111-a1b2c3d`），由流水线写入 `.env` 的 `FRONTEND_IMAGE` / `BACKEND_IMAGE`，**禁止在服务器上手工改 tag 却不留记录**。

---

## 四、服务编排说明

### 4.1 通用策略

| 项 | 配置 | 说明 |
|---|---|---|
| 重启策略 | `restart: unless-stopped` | 异常退出、宿主机重启后自动拉起；`minio-init` 为 `"no"` |
| 日志 | json-file，`max-size: 20m`，`max-file: 5` | 单容器日志上限 100 MB，防打满磁盘 |
| 提权防护 | `no-new-privileges:true` | 禁止 setuid 提权 |
| 能力收敛 | 前后端 `cap_drop: ALL` | 中间件需保留内部 entrypoint 所需能力，未 drop |
| 优雅停止 | `stop_grace_period: 30s` | 数据库/消息刷盘时间 |
| 依赖顺序 | `depends_on: condition: service_healthy` | 数据库/缓存/消息未健康则不启动后端 |
| 健康检查 | 全部常驻服务均定义 `healthcheck` | `verify.sh` 与重启策略联动 |

### 4.2 关键服务要点

| 服务 | 要点 |
|---|---|
| frontend | `resolver 127.0.0.11` + 变量 `proxy_pass`，支持 backend 多副本 DNS 轮询；`/actuator/` 直接 404；`/healthz` 供探针使用 |
| backend | 三网络接入；`read_only` + `/tmp` tmpfs；`JAVA_OPTS` 含 `MaxRAMPercentage=70`、`ExitOnOutOfMemoryError` |
| postgres | `PGDATA` 指向子目录避免挂载点权限问题；`scram-sha-256`；慢查询阈值 500ms |
| redis | 密码由启动命令注入，不落配置文件；`FLUSHALL/FLUSHDB/KEYS` 已禁用或重命名 |
| kafka | KRaft 单节点；`CLUSTER_ID` 必须为 22 位 base64；日志保留 168h |
| minio | 桶与版本控制由 `minio-init` 一次性任务创建，幂等 |
| grafana | 仅绑定 `127.0.0.1`；数据源自动装配，禁止匿名与注册 |

### 4.3 有状态服务的单点说明

本编排中 PostgreSQL / Redis / Kafka / MinIO 均为单节点，满足单机生产部署；**跨机高可用需迁移到 Kubernetes 或托管服务**（见第十一章扩容方案）。

---

## 五、网络规划与隔离

1. **只暴露必要入口**：仅 `frontend` 与 `grafana`（绑定 loopback）映射宿主机端口。
2. **数据域禁出网**：`data` 网络 `internal: true`，即使容器被植入恶意脚本也无法直连外网。
3. **观测域独立**：Prometheus/Loki 不接入 `edge`，避免攻击面扩大。
4. **DNS 轮询**：Nginx `resolver 127.0.0.11 valid=10s` 每 10s 重新解析 `backend`，副本扩缩容后自动生效。
5. **跨主机访问**：需要 TLS 与外网域名时，在 frontend 前置负载均衡/SLB 或挂载证书开启 443（模板中保留扩展点）。
6. **端口冲突排查**：`ss -lntp | grep -E '80|3000'`。

---

## 六、存储与持久化

### 6.1 命名卷

| 卷 | 挂载点 | 内容 | 备份方式 |
|---|---|---|---|
| `pmp_pg_data` | postgres:/var/lib/postgresql/data | 业务库 | `pg_dump -Fc` |
| `pmp_redis_data` | redis:/data | AOF + RDB | 可重建（缓存），关键数据以 PG 为准 |
| `pmp_kafka_data` | kafka:/var/lib/kafka/data | 消息日志 | 无需备份，按保留期滚动 |
| `pmp_minio_data` | minio:/data | 对象/文件 | `mc mirror` |
| `pmp_prometheus_data` | prometheus:/prometheus | 指标 15 天 | 无需备份 |
| `pmp_loki_data` | loki:/loki | 日志 7 天 | 无需备份 |
| `pmp_grafana_data` | grafana:/var/lib/grafana | 看板与账号 | 导出 JSON 或快照 |

### 6.2 只读挂载清单

| 宿主机路径 | 容器路径 | 服务 |
|---|---|---|
| `./frontend/nginx/nginx.conf` | `/etc/nginx/nginx.conf` | frontend |
| `./frontend/nginx/templates` | `/etc/nginx/templates` | frontend |
| `./postgres/init` | `/docker-entrypoint-initdb.d` | postgres |
| `./redis/redis.conf` | `/usr/local/etc/redis/redis.conf` | redis |
| `./minio/init-buckets.sh` | `/scripts/init-buckets.sh` | minio-init |
| `./observability/**` | 各组件配置路径 | prometheus / loki / promtail / grafana |
| `/var/lib/docker/containers` | 同路径 | promtail（只读，不含 docker.sock） |

### 6.3 卷管理命令

```bash
docker volume ls | grep pmp_
docker volume inspect pmp_pg_data
docker compose --env-file .env -f docker-compose.yml down          # 保留卷
docker compose --env-file .env -f docker-compose.yml down -v       # 危险：删除数据卷，仅限重建环境
```

---

## 七、配置与密钥管理

### 7.1 敏感信息流转

```
密钥系统（Vault/KMS）/ 运维手工填写
        │ 生成 .env（chmod 600）
        ▼
deploy/.env ──docker compose──► 容器环境变量
        │                            │
        └── 禁止提交 Git ────────────┴──► 应用读取（Spring Environment）
```

- `docker-compose.yml` 中**不出现任何明文口令**，全部 `${VAR}` 引用，缺失时启动报错（必填项无默认值）。
- `.env` 不入库：`.gitignore` 忽略 `deploy/.env`、`deploy/.env.dev`、`deploy/.env.test`、`deploy/backups/`。
- 生产建议由 Vault Agent 渲染 `.env` 后再执行部署；密钥轮换时改 `.env` 后 `docker compose up -d` 重建容器。

### 7.2 多环境差异

| 项 | 开发 | 测试 | 生产 |
|---|---|---|---|
| 编排文件 | `docker-compose.yml` + `docker-compose.dev.yml` | + `docker-compose.test.yml` | 仅 `docker-compose.yml` |
| 变量文件 | `.env.dev` | `.env.test` | `.env` |
| 项目名 | `pmp-dev` | `pmp-test` | `pmp` |
| 入口绑定 | `127.0.0.1:8080` | `0.0.0.0:8088` | `0.0.0.0:80` |
| 中间件端口 | 本机映射便于调试 | 不映射 | 不映射 |
| Grafana | `127.0.0.1:3000` | `127.0.0.1:3001` | `127.0.0.1:3000` |
| 日志级别 | DEBUG | DEBUG | INFO |
| 备份保留 | 7 天 | 14 天 | 30 天 |

```bash
# 开发
docker compose --env-file .env.dev -f docker-compose.yml -f docker-compose.dev.yml up -d
# 测试
docker compose --env-file .env.test -f docker-compose.yml -f docker-compose.test.yml up -d
# 生产
cp .env.prod.example .env && vi .env && docker compose up -d
```

### 7.3 变量清单（节选）

| 变量 | 必填 | 说明 |
|---|---|---|
| `POSTGRES_PASSWORD` / `REDIS_PASSWORD` / `MINIO_ROOT_PASSWORD` / `GRAFANA_ADMIN_PASSWORD` | 是 | 16 位以上强随机，禁止复用 |
| `KAFKA_CLUSTER_ID` | 是 | 22 位 base64，首次部署生成后不可随意变更 |
| `HTTP_PORT` / `HTTP_BIND` | 是 | 入口端口与监听地址 |
| `*_IMAGE` | 是 | 固定 tag，禁止 `latest` |
| `JAVA_OPTS` | 否 | 默认已含 `MaxRAMPercentage=70`，须与内存配额匹配 |

---

## 八、安全配置基线

| # | 要求 | 落地方式 |
|---|---|---|
| 1 | 仅暴露必要端口 | 仅 frontend 与 loopback Grafana |
| 2 | 禁止明文密钥 | `.env` 注入 + 占位符校验 |
| 3 | 非 root 运行 | 前端 `nginx`，后端 `uid 10001` |
| 4 | 禁止提权 | `no-new-privileges` + `cap_drop: ALL` |
| 5 | 只读根文件系统 | 前后端 `read_only` + tmpfs |
| 6 | 数据域禁外网 | `internal: true` |
| 7 | 管理端点不外露 | Nginx `/actuator/` 返回 404；中间件无端口映射 |
| 8 | 数据库强认证 | `scram-sha-256`；Redis `requirepass` |
| 9 | 高危命令禁用 | Redis 重命名/禁用 `KEYS/FLUSHALL/CONFIG` |
| 10 | 最小权限日志采集 | 不挂 `docker.sock`，仅只读日志目录 |
| 11 | 响应头加固 | `nosniff`、`SAMEORIGIN`、CSP、`Referrer-Policy` |
| 12 | 错误信息收敛 | 后端 `include-message/stacktrace: never` |
| 13 | 镜像来源可信 | 固定 tag，建议启用镜像签名与私服扫描 |
| 14 | 日志留存 | json-file 轮转 + Loki 7 天 + 归档 30 天 |
| 15 | Grafana 匿名关闭 | `GF_AUTH_ANONYMOUS_ENABLED=false`、禁止注册 |
| 16 | 备份可校验 | `sha256sum` 校验文件随备份生成 |

> 残余风险（如实说明）：`/var/lib/docker/containers` 只读挂载仍能让采集容器读取其他容器日志；生产若要求强隔离，可将 Promtail 部署为宿主机 systemd 服务或使用 Loki Docker 驱动。TLS/HTTPS 未在本编排内置证书，需在前置 SLB 或扩展 Nginx 443 配置中提供。

---

## 九、标准化部署步骤

### 步骤 0：获取代码

```bash
# 本项目实际部署目录为 /data/pmp；若沿用其它路径，请整体替换下文路径
sudo mkdir -p /data/pmp && sudo chown -R "$USER":"$USER" /data/pmp
git clone <repo> /data/pmp && cd /data/pmp
chmod +x deploy/scripts/*.sh
```

### 步骤 1：前置校验

```bash
bash deploy/scripts/preflight.sh
```

### 步骤 2：配置环境变量

```bash
cd deploy
cp .env.prod.example .env
vi .env            # 替换全部 CHANGE_ME，确认镜像 tag 与端口
chmod 600 .env
```

配置自定义指引：

| 场景 | 修改项 |
|---|---|
| 改访问端口 | `HTTP_PORT` |
| 绑定指定网卡 | `HTTP_BIND=10.0.0.12` |
| 域名 | `SERVER_NAME=pmp.example.com`、`GRAFANA_ROOT_URL` |
| 上传大小 | `CLIENT_MAX_BODY_SIZE=100m` |
| 后端内存 | `JAVA_OPTS` 与 backend `deploy.resources.limits.memory` 同步调整 |
| 升级镜像 | `FRONTEND_IMAGE` / `BACKEND_IMAGE` 改 tag |

### 步骤 3：构建镜像

```bash
bash deploy/scripts/build.sh --pull
```

### 步骤 4：按依赖顺序启动

```bash
bash deploy/scripts/start.sh
```

启动顺序（脚本内置）：`postgres/redis/kafka/minio` → `minio-init` → `backend` → `frontend` → `prometheus/loki/promtail/grafana`，每阶段等待健康。

### 步骤 5：部署验证

```bash
bash deploy/scripts/verify.sh --full
```

通过标准：0 项失败（详见第十章）。

### 步骤 6：配置观测入口

浏览器访问 `http://<宿主机IP>:${HTTP_PORT}/` 验证业务界面；
Grafana 经堡垒机隧道访问：`ssh -L 3000:127.0.0.1:3000 ops@host` → `http://127.0.0.1:3000`。

### 步骤 7：纳入备份计划

```bash
(crontab -l 2>/dev/null; echo "0 2 * * * cd /data/pmp && bash deploy/scripts/backup.sh >> deploy/backups/backup.log 2>&1") | crontab -
```

### 步骤 8：回滚预案

```bash
# 任一验证失败
docker compose --env-file .env down
git checkout <上一个可发布版本> -- deploy/
# 镜像 tag 回退后重新 up -d（数据卷保留，不受影响）
```

---

## 十、部署验证（对照验收要求）

| # | 验收项 | 判定方式 | 对应脚本 |
|---|---|---|---|
| 1 | 所有服务健康 | `docker compose ps` 全部 `healthy`/`running` | `verify.sh` 第 1 项 |
| 2 | 前后端接口链路连通 | `/api/v1/dependencies` 返回 `overall: UP`（PG/Redis/Kafka/MinIO 全 up） | `verify.sh` 第 5 项 |
| 3 | 前端静态资源正常 | `/` 与 `/assets/app.js` 均 200，首页含平台标识 | `verify.sh` 第 3 项 |
| 4 | 重启后数据不丢失 | 重启前后 `/api/v1/checks` 记录数一致 | `verify.sh --full` |
| 5 | 异常退出自动恢复 | 容器内 `kill -TERM 1` 后 180s 内恢复 `healthy`，且 `RestartCount` 递增 | `verify.sh --full` |
| 6 | 资源占用符合阈值 | 所有容器均设 CPU/内存上限，内存占用 < 90% | `verify.sh` 第 2 项 |
| 7 | 管理端点不暴露 | `/actuator/health` 返回 404 | `verify.sh` 第 4 项 |

手工抽查命令（`HTTP_PORT` 以 `.env` 为准，本项目为 8080）：

```bash
curl -s http://127.0.0.1:8080/api/v1/ping
curl -s http://127.0.0.1:8080/api/v1/dependencies | jq .
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8080/actuator/health   # 期望 404
docker stats --no-stream
```

---

## 十一、灰度升级与扩容

### 11.1 后端灰度/滚动升级

```bash
# 修改 .env 中 BACKEND_IMAGE 为新 tag（或直接构建新镜像）
bash deploy/scripts/rolling-upgrade.sh backend 2
```

过程：扩容 `N+1` → 新副本健康 → Nginx 按 DNS 轮询把流量分给新旧副本（灰度窗口）→ 缩容至目标副本数。任一步不健康即回滚副本数并打印日志。

> 局限：Compose 无内建滚动策略与自动回滚，严格零中断建议改用 Swarm/Kubernetes；本脚本保证升级过程中**始终至少 1 个健康副本**。

### 11.2 前端升级

```bash
docker compose --env-file .env up -d --no-deps frontend
```

静态资源容器重建仅需数秒，建议低峰执行。

### 11.3 扩容方案

| 对象 | 方案 | 命令 |
|---|---|---|
| backend | 水平扩容，Nginx 自动轮询 | `docker compose up -d --no-deps --scale backend=4 backend` |
| frontend | 多副本需前置 SLB（容器内无状态） | 同上，配合外部负载均衡 |
| postgres | 单机主库，垂直扩容（调 `deploy.resources.limits` 与 `shared_buffers`）；跨机用流复制 | 修改 `.env` 后 `up -d` |
| redis | 垂直扩容 + 调整 `maxmemory`；集群模式需独立编排 | 同上 |
| kafka | 单节点升 3 节点 KRaft（新增 kafka-2/kafka-3 与 quorum voters） | 需变更编排并滚动重启 |
| minio | 分布式模式（4 节点起），需独立编排与纠删码盘规划 | — |

扩容后务必执行 `verify.sh`，并观察 30 分钟 CPU/内存/延迟。

---

## 十二、日志采集与可观测

### 12.1 日志链路

```
容器 stdout/stderr → Docker json-file（20m×5 轮转）
        │
        ├─► Promtail 读取 /var/lib/docker/containers/*/*-json.log
        │       （JSON 解析 → 提取 stream/container_id → 打标签）
        ▼
      Loki（7 天保留，TSDB + 文件系统）
        ▼
      Grafana → Explore / LogQL 查询
```

常用查询：

```logql
{job="docker"} |= "ERROR"
{job="docker"} |= "pmp-backend" |= "OutOfMemory"
{job="docker"} | json | status >= 500
```

### 12.2 指标链路

- Prometheus 每 15s 抓取 `backend:8080/actuator/prometheus`（JVM、HTTP、Hikari、Redis）。
- 关键告警建议（Grafana Alert / 外部 Alertmanager）：
  - 5xx 比例 > 1% 持续 5 分钟；
  - JVM 堆使用 > 85% 持续 10 分钟；
  - 容器重启次数 10 分钟内 > 2；
  - `/api/v1/dependencies` 非 UP 持续 3 分钟；
  - 磁盘可用 < 15%。

### 12.3 日志级别调整

修改 `.env` 中 `JAVA_OPTS` 追加 `-Dlogging.level.com.pmp=DEBUG`，或 `docker compose up -d` 时注入 `LOGGING_LEVEL_COM_PMP=DEBUG`（测试叠加编排已内置），调整后需重建容器。

---

## 十三、备份与恢复

### 13.1 备份

```bash
bash deploy/scripts/backup.sh                 # 默认写入 deploy/backups
BACKUP_DIR=/data/backup bash deploy/scripts/backup.sh
```

产物：`pg-<时间戳>.dump`（自定义格式）、`pg-*.sha256`、`minio-<时间戳>/`（对象镜像）。保留 `BACKUP_RETENTION_DAYS`（默认 30 天）。

**RPO/RTO 基线**：每日全量 → RPO ≤ 24h；PostgreSQL 单库恢复 ≤ 30 分钟（视数据量）；MinIO 按对象量线性增长。

### 13.2 恢复

```bash
bash deploy/scripts/restore.sh list
bash deploy/scripts/restore.sh pg    deploy/backups/pg-20261111-020000.dump
bash deploy/scripts/restore.sh minio deploy/backups/minio-20261111-020000
```

恢复流程内置：校验 `sha256` → 停后端（避免写入）→ `pg_restore --clean --if-exists` → 启动后端 → 等待健康。恢复后必须执行 `verify.sh` 复核。

### 13.3 异地备份

```bash
# 示例：同步到异地对象存储（独立于生产集群）
rclone sync /data/backup remote:pmp-backup --transfers 8
```

---

## 十四、故障排查指引

| 现象 | 排查命令 | 常见根因 | 处置 |
|---|---|---|---|
| `docker compose up` 报变量未设置 | `docker compose config` | `.env` 缺项或文件名不对 | 补全变量，确认 `--env-file` |
| frontend 起不来 / 502 | `docker compose logs frontend` | 模板渲染失败、backend 未健康 | 检查 `BACKEND_UPSTREAM`、执行 `docker compose ps` |
| 502 但 backend healthy | `docker compose exec frontend wget -qO- http://backend:8080/api/v1/ping` | 网络未连通/端口错 | 检查 backend 是否在 edge 网络 |
| backend 反复重启 | `docker compose logs --tail=200 backend` | 数据库连接失败、OOM、配置错误 | 修正 `.env`；关注 `ExitOnOutOfMemoryError` |
| postgres 启动失败 | `docker compose logs postgres` | 密码/权限、PGDATA 目录残留 | 首次部署可 `down -v` 重建（会丢数据，须确认） |
| kafka 启动报 cluster id 非法 | `docker compose logs kafka` | `KAFKA_CLUSTER_ID` 非 22 位 base64 | 用 `kafka-storage.sh random-uuid` 生成 |
| redis 探针失败 | `docker compose exec redis redis-cli -a $REDIS_PASSWORD ping` | 密码不一致、内存达上限 | 核对 `.env`；观察 `maxmemory` 与淘汰策略 |
| minio-init 退出非 0 | `docker compose logs minio-init` | minio 未就绪、凭据错 | 修复后 `docker compose up -d minio-init`（幂等） |
| Grafana 面板无数据 | `curl -s http://prometheus:9090/-/healthy`（容器内） | 抓取目标 down、网络不通 | 检查 monitor 网络与 `prometheus.yml` |
| 日志查不到 | `docker compose logs promtail` | 宿主日志路径不一致（非 Linux） | 确认 `/var/lib/docker/containers` 可读 |
| 磁盘写满 | `du -sh /data/docker/*`、`docker system df` | 镜像/构建缓存/日志堆积 | `docker image prune -f`、`builder prune`、清理旧备份 |
| 内存超限被杀 | `docker events --filter event=oom` | JVM 堆与容器限额不匹配 | 下调 `MaxRAMPercentage` 或提高限额 |
| 端口冲突 | `ss -lntp \| grep :80` | 旧实例或其他服务占用 | 停旧实例或改 `HTTP_PORT` |

排障固定顺序：**看状态 → 看日志 → 进容器验证依赖 → 查资源 → 查网络**。

---

## 十五、环境适配与离线部署（实测记录）

本章记录 192.168.102.242 实际部署时遇到的非标准环境问题与处理方式。新环境若出现同类现象，可直接照此处理。

### 15.1 宿主机 80/443 被占用：入口改用 8080

现象：`docker compose up` 报 `bind: address already in use`，`ss -lntp | grep :80` 显示已有其它业务栈（本机为 Dify）。

处置：只改 `.env`，不动编排：

```bash
cd /data/pmp/deploy
grep -n '^HTTP_PORT=' .env            # 确认当前值
sed -i 's/^HTTP_PORT=.*/HTTP_PORT=8080/' .env
ss -lntp | grep -E ':(8080)\b'        # 确认 8080 未被占用
docker compose --env-file .env up -d frontend
```

验证：`curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8080/` → `200`。

### 15.2 MinIO 镜像不可用：提取二进制本地构建

现象与原因：

- Docker Hub 上 `minio/minio` 官方镜像已下架，拉取返回 `403/404`；`quay.io/minio/minio` 匿名拉取 `401`。
- `pgsty/minio` 等 2026 年新版二进制要求 CPU 支持 `x86-64-v2`，本机为 KVM 通用型号，启动即报 `Fatal glibc error: CPU does not support x86-64-v2`。

可行方案：从 Bitnami Legacy 镜像中提取 2024-12 版本的二进制（Go 1.23.5 编译，兼容当前 CPU），基于 alpine 重建，并**打回 compose 期望的 tag**，编排无需改动。

```bash
# 1) 准备构建目录并提取二进制
mkdir -p /tmp/minio-build && cd /tmp/minio-build
docker pull bitnamilegacy/minio:2024.12.18
docker pull bitnamilegacy/minio-client:2025.7.21

cid=$(docker create bitnamilegacy/minio:2024.12.18)
docker cp "$cid":/opt/bitnami/minio/bin/minio ./minio && docker rm "$cid"

cid=$(docker create bitnamilegacy/minio-client:2025.7.21)
docker cp "$cid":/opt/bitnami/minio-client/bin/mc ./mc && docker rm "$cid"

# 2) 构建 minio 镜像
cat > Dockerfile.minio <<'EOF'
FROM alpine:3.20
RUN apk add --no-cache curl ca-certificates tzdata
COPY minio /usr/bin/minio
RUN chmod +x /usr/bin/minio
EXPOSE 9000 9001
VOLUME ["/data"]
ENTRYPOINT ["/usr/bin/minio"]
CMD ["server", "/data"]
EOF
docker build -f Dockerfile.minio -t minio/minio:RELEASE.2024-12-18T13-15-44Z .

# 3) 构建 mc 镜像
cat > Dockerfile.mc <<'EOF'
FROM alpine:3.20
RUN apk add --no-cache ca-certificates tzdata
COPY mc /usr/bin/mc
RUN chmod +x /usr/bin/mc
ENTRYPOINT ["/usr/bin/mc"]
EOF
docker build -f Dockerfile.mc -t minio/mc:RELEASE.2024-11-21T17-21-54Z .

# 4) 冒烟验证
docker run --rm minio/minio:RELEASE.2024-12-18T13-15-44Z --version
```

要点：

| 项 | 说明 |
|---|---|
| 镜像 tag | 必须与 `.env` 的 `MINIO_IMAGE` / `MC_IMAGE` 完全一致，否则 compose 会重新去远端拉取 |
| 镜像内依赖 | `curl` 用于 healthcheck（`/minio/health/live`），`tzdata` 用于时区，`ca-certificates` 用于 TLS |
| 镜像来源 | 已包含在宿主机本地镜像库；迁移机器时需执行 `docker save` / `docker load` 或重新构建 |
| 升级路径 | 若新宿主机支持 x86-64-v2，可直接改 `.env` 用官方镜像 tag，无需本地构建 |

迁移到其它机器时导出镜像：

```bash
docker save minio/minio:RELEASE.2024-12-18T13-15-44Z minio/mc:RELEASE.2024-11-21T17-21-54Z \
  | gzip > /tmp/minio-images.tgz
# 目标机
gunzip -c /tmp/minio-images.tgz | docker load
```

### 15.3 Promtail 采集适配

本机存在其它业务栈（Dify）的历史容器日志，直接采集会触发两类问题，已在编排与配置中修复：

| 问题 | 现象 | 修复 |
|---|---|---|
| promtail 镜像无 `curl`/`wget` | healthcheck 永远失败，容器 `unhealthy` | `docker-compose.yml` 的 promtail healthcheck 改为 `bash -c 'exec 3<>/dev/tcp/127.0.0.1/9080'` |
| 历史日志早于 Loki 保留窗口 | Loki 返回 `400 entry too far behind`，日志断流 | `promtail-config.yml` 在 timestamp 阶段后增加 `drop: {older_than: 24h, drop_counter_reason: log_too_old}` |

验证：

```bash
docker compose --env-file .env ps promtail          # 期望 healthy
docker compose --env-file .env logs --tail=50 promtail | grep -i -E 'error|too old' || echo "无采集错误"
```

### 15.4 Docker 29+ 的 restart 语义与自愈验证

实测（Docker Engine 29.4.3）：宿主机执行 `docker kill <container>` 后，容器保持 `exited`，`RestartCount` 不增长，即使策略为 `always`。这是新版把外部强杀视作**主动停止**，与 `restart` 策略的设计语义一致；真实进程崩溃仍会自动重启。

正确的自愈演练方式：

```bash
# 模拟进程异常终止（会短暂中断服务，低峰执行）
docker exec pmp-backend-1 kill -TERM 1
sleep 5
docker inspect -f 'restarts={{.RestartCount}} health={{.State.Health.Status}}' pmp-backend-1
# 期望：restarts 递增，约 20~30s 后 healthy
```

`deploy/scripts/verify.sh` 已按此调整：第 6 步用 `dc exec -T backend sh -c 'kill -TERM 1'` 触发重启，并在 5s 后校验健康与 `RestartCount` 增长，避免"刚 kill 就查状态"导致的假阳性。

### 15.5 `.env` 与文件传输常见坑

| 现象 | 原因 | 处置 |
|---|---|---|
| `JAVA_OPTS` 报解析错误 / JVM 参数被截断 | 值中含空格但未加引号 | `JAVA_OPTS="-XX:MaxRAMPercentage=70 ..."` |
| 密码含 `$`、`#`、空格导致认证失败 | compose 变量插值或注释截断 | 统一用双引号包裹；`$` 写成 `$$` 或换用无特殊字符强密码 |
| Windows 编辑后容器启动报 `no such file` | 文件为 CRLF 换行 | 保存为 LF；`file deploy/scripts/*.sh` 确认无 CRLF |
| 改完 `.env` 但容器行为未变 | 部分变量只在创建容器时注入 | `docker compose up -d --force-recreate <service>` |
| `.env` 权限过宽 | 默认 644 可被其他用户读取 | `chmod 600 .env` |

---

## 十六、附录

### 16.1 常用命令

```bash
cd deploy
docker compose --env-file .env ps
docker compose --env-file .env logs -f --tail=100 backend
docker compose --env-file .env exec backend sh
docker compose --env-file .env restart backend
docker compose --env-file .env config > /tmp/rendered-compose.yml
docker compose --env-file .env down
docker compose --env-file .env up -d --remove-orphans
```

### 16.2 已知限制与后续演进

1. 本编排面向**单机生产**；跨机高可用需迁移 Kubernetes（保留相同镜像与配置）。
2. 未内置 HTTPS 证书与 WAF，需前置 SLB/网关（架构方案中的 APISIX）承载 TLS、限流与鉴权。
3. 后端为可运行的基线工程（ping/meta/dependencies/checks），接入真实业务包时替换 `deploy/backend` 源码与 `pom.xml`，镜像构建方式不变。
4. 本编排已在 192.168.102.242（Ubuntu 22.04 / Docker 29.4.3）完成实际部署，`verify.sh --full` 33 项全部通过；其它宿主机首次部署仍需按第九章执行并复核。
5. MinIO 镜像为本地构建产物（官方镜像下架 + CPU 基线限制），迁移宿主机时需 `docker save`/`docker load` 或按 15.2 重新构建。
6. 宿主机 `ulimit -n` 当前为 1024，低于高并发场景建议值，建议调整为 65535 后重启 Docker。
7. Grafana 仅绑定 `127.0.0.1`，跨网访问需 SSH 隧道或前置网关。
