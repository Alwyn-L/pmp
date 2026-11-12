#!/usr/bin/env bash
# =============================================================================
# 部署前置校验：宿主机 Docker / Compose 版本、资源、端口、配置完整性
# 用法：bash deploy/scripts/preflight.sh
# 退出码：0 全部通过（允许有 WARN）；1 存在阻断项
# =============================================================================
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

FAIL=0
ok() { printf '  [ OK ] %s\n' "$*"; }
ng() { printf '  [FAIL] %s\n' "$*"; FAIL=$((FAIL + 1)); }
wn() { printf '  [WARN] %s\n' "$*"; }

# 版本比较：version_ge 实际版本 最低版本
version_ge() {
  [ "$(printf '%s\n%s\n' "$2" "$1" | sort -V | head -n1)" = "$2" ]
}

echo "=============================================================="
echo " PMP 部署前置校验"
echo "=============================================================="

# ---------- 1. Docker ----------
echo "[1/7] Docker 与 Compose 版本"
if command -v docker >/dev/null 2>&1; then
  DOCKER_VER="$(docker version --format '{{.Server.Version}}' 2>/dev/null || true)"
  if [ -z "${DOCKER_VER}" ]; then
    ng "Docker daemon 不可用（请启动 Docker 服务并确认当前用户有权访问）"
  else
    ok "Docker Engine ${DOCKER_VER}"
    if version_ge "${DOCKER_VER}" "24.0.0"; then
      ok "Docker Engine 版本满足要求（>= 24.0.0）"
    else
      ng "Docker Engine 版本过低（要求 >= 24.0.0，当前 ${DOCKER_VER}）"
    fi
  fi
else
  ng "未安装 docker CLI"
fi

if docker compose version >/dev/null 2>&1; then
  COMPOSE_VER="$(docker compose version --short 2>/dev/null | sed 's/^v//')"
  ok "Docker Compose ${COMPOSE_VER}"
  if version_ge "${COMPOSE_VER}" "2.20.0"; then
    ok "Compose 版本满足要求（>= 2.20.0）"
  else
    ng "Compose 版本过低（要求 >= 2.20.0，当前 ${COMPOSE_VER}）"
  fi
else
  ng "未安装 docker compose 插件（v2）"
fi

# ---------- 2. 操作系统与主机资源 ----------
echo "[2/7] 操作系统与主机资源"
OS="$(uname -s)"
if [ "${OS}" = "Linux" ]; then
  ok "操作系统：Linux $(uname -r)"
  if [ -f /proc/sys/vm/max_map_count ]; then
    ok "vm.max_map_count = $(cat /proc/sys/vm/max_map_count)"
  fi
else
  wn "当前为 ${OS}，脚本按 Linux 宿主机设计；Windows/macOS 仅建议本地验证"
fi

CPU_CORES="$(getconf _NPROCESSORS_ONLN 2>/dev/null || echo 0)"
if [ "${CPU_CORES}" -ge 4 ]; then ok "CPU 核数 ${CPU_CORES}（>= 4）"; else ng "CPU 核数不足（当前 ${CPU_CORES}，建议 >= 4）"; fi

MEM_MB="$(awk '/MemTotal/ {printf "%d", $2/1024}' /proc/meminfo 2>/dev/null || echo 0)"
if [ "${MEM_MB}" -ge 7800 ]; then ok "内存 ${MEM_MB} MB（>= 8 GB）"; else wn "内存 ${MEM_MB} MB，低于建议值 8 GB"; fi

DOCKER_ROOT="$(docker info --format '{{.DockerRootDir}}' 2>/dev/null || echo /var/lib/docker)"
FREE_GB="$(df -Pk "${DOCKER_ROOT}" 2>/dev/null | awk 'NR==2 {printf "%d", $4/1024/1024}')"
FREE_GB="${FREE_GB:-0}"
if [ "${FREE_GB}" -ge 20 ]; then ok "Docker 数据盘可用 ${FREE_GB} GB（>= 20 GB）"; else ng "Docker 数据盘可用空间不足（当前 ${FREE_GB} GB，要求 >= 20 GB）"; fi

NOFILE="$(ulimit -n)"
if [ "${NOFILE}" = "unlimited" ] || [ "${NOFILE}" -ge 65535 ]; then ok "ulimit -n = ${NOFILE}"; else wn "ulimit -n = ${NOFILE}，建议 >= 65535"; fi

# ---------- 3. 环境变量文件 ----------
echo "[3/7] 环境变量与密钥"
if [ -f "${ENV_FILE}" ]; then
  ok "环境变量文件：${ENV_FILE}"
  if check_placeholders 2>/dev/null; then
    ok "无未替换的 CHANGE_ME 占位符"
  else
    ng "存在未替换的 CHANGE_ME 占位符（见上方输出）"
  fi
  PERM="$(stat -c '%a' "${ENV_FILE}" 2>/dev/null || echo '')"
  if [ "${PERM}" = "600" ]; then ok "文件权限 600"; else wn ".env 权限为 ${PERM:-未知}，生产要求 chmod 600"; fi
else
  ng "未找到 ${ENV_FILE}（请 cp .env.example .env 后修改）"
fi

# ---------- 4. 编排与配置文件完整性 ----------
echo "[4/7] 编排与配置文件"
REQUIRED_FILES=(
  "docker-compose.yml"
  "frontend/Dockerfile"
  "frontend/nginx/nginx.conf"
  "frontend/nginx/templates/default.conf.template"
  "backend/Dockerfile"
  "backend/pom.xml"
  "postgres/init/01-init.sql"
  "redis/redis.conf"
  "minio/init-buckets.sh"
  "observability/prometheus/prometheus.yml"
  "observability/loki/loki-config.yml"
  "observability/promtail/promtail-config.yml"
  "observability/grafana/provisioning/datasources/datasources.yml"
)
for f in "${REQUIRED_FILES[@]}"; do
  if [ -f "${DEPLOY_DIR}/${f}" ]; then ok "存在 ${f}"; else ng "缺少 ${f}"; fi
done

# ---------- 5. 编排语法校验 ----------
echo "[5/7] compose 配置静态校验"
if dc config --quiet >/dev/null 2>&1; then
  ok "docker compose config 校验通过"
else
  ng "docker compose config 校验失败，请执行以下命令查看详情："
  echo "       cd ${DEPLOY_DIR} && docker compose --env-file ${ENV_FILE} config" >&2
fi

# ---------- 6. 端口占用 ----------
echo "[6/7] 入口端口占用"
load_env 2>/dev/null || true
CHECK_PORT="${HTTP_PORT:-80}"
if command -v ss >/dev/null 2>&1; then
  if ss -lnt 2>/dev/null | awk '{print $4}' | grep -qE "[:.]${CHECK_PORT}\$"; then
    ng "端口 ${CHECK_PORT} 已被占用（如为已运行的旧实例，请先停服或改 HTTP_PORT）"
  else
    ok "端口 ${CHECK_PORT} 空闲"
  fi
else
  wn "未找到 ss 命令，跳过端口占用检查"
fi

# ---------- 7. 时间同步 ----------
echo "[7/7] 时间同步"
if command -v timedatectl >/dev/null 2>&1; then
  if timedatectl show -p NTPSynchronized --value 2>/dev/null | grep -qi yes; then
    ok "NTP 已同步"
  else
    wn "NTP 未同步，证书校验与日志时间可能异常"
  fi
else
  wn "未找到 timedatectl，跳过时间同步检查"
fi

echo "=============================================================="
if [ "${FAIL}" -eq 0 ]; then
  echo " 校验结果：通过（0 项阻断）"
  echo " 下一步：bash deploy/scripts/build.sh"
  exit 0
else
  echo " 校验结果：失败（${FAIL} 项阻断）"
  exit 1
fi
