#!/usr/bin/env bash
# =============================================================================
# 按依赖顺序启动全部服务，并等待健康检查通过
# 用法：bash deploy/scripts/start.sh [--no-build]
# =============================================================================
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

BUILD_ARGS=(--build)
if [ "${1:-}" = "--no-build" ]; then
  BUILD_ARGS=()
fi

load_env
check_placeholders || die "请先替换 .env 中的 CHANGE_ME 占位符"

log "1/5 校验编排配置"
dc config --quiet || die "compose 配置有误"

log "2/5 启动有状态中间件（postgres / redis / kafka / minio）"
dc up -d "${BUILD_ARGS[@]}" postgres redis kafka minio
wait_healthy 240 || die "中间件未在 240s 内就绪，请执行 docker compose ps 与 logs 排查"

log "3/5 初始化对象存储桶"
dc up -d minio-init
( cd "${DEPLOY_DIR}" && docker compose "${COMPOSE_ARGS[@]}" logs --tail=20 minio-init || true )

log "4/5 启动后端与前端（依赖顺序由 depends_on: service_healthy 保证）"
dc up -d "${BUILD_ARGS[@]}" backend frontend

log "5/5 启动可观测组件"
dc up -d prometheus loki promtail grafana

log "等待全部服务健康..."
wait_healthy 420 || die "服务未在 420s 内全部就绪，请执行 docker compose ps 排查"

dc ps
log "启动完成，访问入口：http://<宿主机IP>:${HTTP_PORT}/"
log "下一步：bash deploy/scripts/verify.sh --full"
