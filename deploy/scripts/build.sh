#!/usr/bin/env bash
# =============================================================================
# 镜像构建：按 .env 中固定 tag 构建前后端镜像（不自动推送仓库）
# 用法：bash deploy/scripts/build.sh [--pull]
#   --pull  构建前拉取基础镜像最新补丁层
# =============================================================================
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

PULL_ARGS=()
if [ "${1:-}" = "--pull" ]; then
  PULL_ARGS=(--pull)
fi

load_env
log "构建上下文：${PROJECT_ROOT}"
log "前端镜像：${FRONTEND_IMAGE}"
log "后端镜像：${BACKEND_IMAGE}"

dc build "${PULL_ARGS[@]}" frontend backend

log "镜像构建完成"
docker image ls --format 'table {{.Repository}}\t{{.Tag}}\t{{.Size}}' \
  | awk 'NR==1 || $1 ~ /pmp\//'

log "如需推送镜像仓库：docker push ${FRONTEND_IMAGE} && docker push ${BACKEND_IMAGE}"
