#!/usr/bin/env bash
# =============================================================================
# 公共函数库（被 deploy/scripts 下其它脚本 source，不单独执行）
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
PROJECT_ROOT="$(cd "${DEPLOY_DIR}/.." && pwd)"

# 环境变量文件与编排文件可通过环境变量覆盖
ENV_FILE="${ENV_FILE:-${DEPLOY_DIR}/.env}"
COMPOSE_FILES="${COMPOSE_FILES:-docker-compose.yml}"

COMPOSE_ARGS=()
build_compose_args() {
  COMPOSE_ARGS=(--env-file "${ENV_FILE}")
  local f
  local IFS=':'
  for f in ${COMPOSE_FILES}; do
    COMPOSE_ARGS+=(-f "${f}")
  done
}
build_compose_args

dc() { ( cd "${DEPLOY_DIR}" && docker compose "${COMPOSE_ARGS[@]}" "$@" ); }

log()  { printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }
warn() { printf '[%s] WARN  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >&2; }
err()  { printf '[%s] ERROR %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >&2; }
die()  { err "$*"; exit 1; }

# 加载 .env 到当前 shell（变量同时供 compose 与脚本使用）
load_env() {
  [ -f "${ENV_FILE}" ] || die "未找到环境变量文件：${ENV_FILE}（请先 cp .env.example .env 并修改）"
  set -a
  # shellcheck disable=SC1090
  . "${ENV_FILE}"
  set +a
}

# 检查是否仍有未替换的占位符（忽略注释行）
check_placeholders() {
  local hits
  hits="$(grep -n 'CHANGE_ME' "${ENV_FILE}" | grep -vE '^[0-9]+:[[:space:]]*#' || true)"
  if [ -n "${hits}" ]; then
    err "环境变量文件中仍存在未替换的占位符："
    printf '%s\n' "${hits}" >&2
    return 1
  fi
}

# 等待 compose 中所有服务健康（无 healthcheck 的服务要求 running）
wait_healthy() {
  local timeout="${1:-420}" elapsed=0 not_ready svc state health output
  while :; do
    not_ready=0
    output="$(dc ps --format '{{.Service}} {{.State}} {{.Health}}' 2>/dev/null || true)"
    if [ -z "${output}" ]; then
      not_ready=1
    else
      while read -r svc state health; do
        [ -n "${svc:-}" ] || continue
        if [ -n "${health:-}" ] && [ "${health}" != "<no value>" ]; then
          [ "${health}" = "healthy" ] || not_ready=1
        else
          [ "${state}" = "running" ] || not_ready=1
        fi
      done <<< "${output}"
    fi

    if [ "${not_ready}" -eq 0 ]; then
      return 0
    fi
    elapsed=$((elapsed + 5))
    if [ "${elapsed}" -ge "${timeout}" ]; then
      dc ps
      return 1
    fi
    sleep 5
  done
}

# 容器健康状态（无 healthcheck 时返回 State）
container_health() {
  local id="$1"
  docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "${id}" 2>/dev/null || echo "unknown"
}

http_code() {
  curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$1" 2>/dev/null || echo "000"
}
