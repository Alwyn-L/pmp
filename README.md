# PMP 制造协同平台

生产级单机部署（Docker Compose）：Spring Boot 3 / Java 21 后端 + Nginx 前端 + PostgreSQL / Redis / Kafka / MinIO + Prometheus / Loki / Grafana 可观测。

**当前已上线环境**：http://192.168.102.242:8080/（Ubuntu 22.04 / Docker 29.4.3，10 个常驻服务全部 healthy）

---

## 目录结构

```
pmp/
├── deploy/                     # 部署交付物
│   ├── docker-compose.yml      # 生产编排（10 服务 + minio-init）
│   ├── docker-compose.dev.yml  # 开发叠加编排
│   ├── docker-compose.test.yml # 测试叠加编排
│   ├── .env.example            # 环境变量模板（复制为 .env 后填写）
│   ├── .env.{dev,test,prod}.example
│   ├── backend/                # Spring Boot 源码与 Dockerfile
│   ├── frontend/               # 静态资源与 Nginx 配置
│   ├── postgres/ redis/ minio/ # 初始化脚本与配置
│   ├── observability/          # Prometheus / Loki / Promtail / Grafana
│   └── scripts/                # preflight/build/start/verify/backup/restore/rolling-upgrade
└── docs/                       # 架构、页面清单与部署运维文档
```

## 快速部署（新机器）

前置：Linux x86_64、Docker Engine ≥ 24.0、Docker Compose v2、建议 8C16G、磁盘可用 ≥ 20 GB。

```bash
# 1) 代码落到部署目录（本项目约定 /data/pmp）
sudo mkdir -p /data/pmp && sudo chown -R "$USER":"$USER" /data/pmp
git clone <repo> /data/pmp && cd /data/pmp

# 2) 环境变量：替换全部 CHANGE_ME；80/443 被占用时改 HTTP_PORT
cd deploy
cp .env.prod.example .env
vi .env
chmod 600 .env
bash scripts/preflight.sh

# 3) 构建 → 启动 → 验证
bash scripts/build.sh --pull
bash scripts/start.sh
bash scripts/verify.sh --full      # 通过标准：失败项 0

# 4) 浏览器访问
# http://<宿主机IP>:<HTTP_PORT>/
```

> MinIO 官方镜像已下架且新版二进制要求 CPU 支持 `x86-64-v2`，部分宿主机需本地构建镜像，步骤见
> [部署手册 15.2 节](docs/生产级Docker-Compose部署与运维手册.md)。

## 服务与访问

| 服务 | 访问方式 | 说明 |
|---|---|---|
| 业务入口 | `http://<IP>:8080/` | 唯一对外入口（端口由 `HTTP_PORT` 决定） |
| 健康检查 | `/healthz`、`/api/v1/ping`、`/api/v1/dependencies` | `dependencies` 返回 `overall: UP` 即依赖全通 |
| Grafana | `ssh -L 3000:127.0.0.1:3000 lg@192.168.102.242` → `http://127.0.0.1:3000` | 仅绑定本机回环 |
| PostgreSQL / Redis / Kafka / MinIO | 不对宿主机暴露端口 | 运维经 `docker compose exec` 进入 |
| 管理端点 | `/actuator/*` 对外返回 404 | 仅容器内网可访问 |

## 日常运维

```bash
cd /data/pmp/deploy

docker compose --env-file .env ps                      # 状态
docker compose --env-file .env logs -f --tail=100 backend
bash scripts/verify.sh                                 # 快速验证
bash scripts/verify.sh --full                          # 含重启持久化与自愈
bash scripts/backup.sh                                 # PostgreSQL + MinIO 备份
bash scripts/restore.sh list                           # 查看可恢复备份
bash scripts/rolling-upgrade.sh backend 2              # 后端滚动升级
```

故障演练请使用 `docker exec pmp-backend-1 kill -TERM 1`，不要用宿主侧 `docker kill`（Docker 29+ 视为主动停止，不触发重启）。

## 文档索引

| 文档 | 内容 |
|---|---|
| [生产级Docker-Compose部署与运维手册.md](docs/生产级Docker-Compose部署与运维手册.md) | 架构与网络、前置依赖、编排说明、标准化部署、验收、升级扩容、备份恢复、环境适配实测 |
| [日常运维与故障排查清单.md](docs/日常运维与故障排查清单.md) | 日/周/月巡检、告警分级、故障树、变更管理、红线清单 |
| [系统整合架构设计方案-V1.0.md](docs/系统整合架构设计方案-V1.0.md) | 系统整合总体架构与演进路线 |
| [供应链九大系统-落地补充-V1.1.md](docs/供应链九大系统-落地补充-V1.1.md) | 九大系统协同与接口清单 |
| [UI页面清单与设计说明.md](docs/UI页面清单与设计说明.md) | 页面清单、角色权限与交互说明 |

## 约定与红线

1. 所有口令、密钥只写在 `deploy/.env`，禁止写入编排文件或提交仓库。
2. 镜像必须使用固定 tag，禁止 `latest`。
3. 禁止对生产执行 `docker compose down -v`。
4. 变更前后必须执行 `verify.sh` / `verify.sh --full` 并记录结果。
