#!/usr/bin/env bash
# =============================================================================
# 灰度 / 滚动升级（Compose 版）
# 用法：bash deploy/scripts/rolling-upgrade.sh [服务名] [目标副本数]
#   默认：backend 1
# 原理：
#   1. 先按新镜像扩出 1 个副本，Nginx 通过 resolver + 变量 proxy_pass
#      对新旧副本做 DNS 轮询，形成天然灰度；
#   2. 新副本健康后缩回目标副本数；
#   3. 任一步失败即停止，可用 git 回退镜像 tag 后重复执行。
# 注意：Compose 无内置滚动策略，此脚本保证「过程中至少 1 个健康副本」；
#       严格零中断与自动回滚请使用 Swarm/Kubernetes。
# =============================================================================
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

SERVICE="${1:-backend}"
TARGET="${2:-1}"

load_env

case "${SERVICE}" in
  backend|frontend) ;;
  *) die "仅支持 backend / frontend（其它服务为有状态组件，升级需停机窗口）" ;;
esac

CURRENT="$(dc ps -q "${SERVICE}" 2>/dev/null | wc -l | tr -d ' ')"
log "服务 ${SERVICE} 当前副本数：${CURRENT}，目标副本数：${TARGET}"

wait_service_healthy() {
  local svc="$1" want="$2" timeout="${3:-300}" elapsed=0 healthy ids id st
  while [ "${elapsed}" -lt "${timeout}" ]; do
    ids="$(dc ps -q "${svc}" 2>/dev/null || true)"
    healthy=0
    for id in ${ids}; do
      st="$(container_health "${id}")"
      [ "${st}" = "healthy" ] && healthy=$((healthy + 1))
    done
    if [ "${healthy}" -ge "${want}" ]; then return 0; fi
    sleep 5
    elapsed=$((elapsed + 5))
  done
  return 1
}

log "1/4 构建新镜像（如需改用私服镜像，跳过本步并直接修改 .env 中镜像 tag）"
dc build "${SERVICE}"

log "2/4 扩容到 $((CURRENT + 1)) 个副本，接入新版本"
NEW_COUNT=$((CURRENT + 1))
dc up -d --no-deps --scale "${SERVICE}=${NEW_COUNT}" "${SERVICE}"

log "3/4 等待新副本健康"
if ! wait_service_healthy "${SERVICE}" "${NEW_COUNT}" 300; then
  err "新副本未就绪，执行回滚：恢复副本数 ${CURRENT}"
  dc up -d --no-deps --scale "${SERVICE}=${CURRENT}" "${SERVICE}"
  dc logs --tail=80 "${SERVICE}" || true
  die "升级失败，已恢复到 ${CURRENT} 副本（新容器可能仍不健康，请检查镜像与配置）"
fi
log "新副本已健康，Nginx 正在按 DNS 轮询分发流量（灰度窗口）"

sleep 15

log "4/4 缩容到目标副本数 ${TARGET}"
dc up -d --no-deps --scale "${SERVICE}=${TARGET}" "${SERVICE}"
wait_service_healthy "${SERVICE}" "${TARGET}" 180 || warn "缩容后副本健康检查超时，请人工确认"

log "升级完成，建议执行：bash deploy/scripts/verify.sh"
dc ps
