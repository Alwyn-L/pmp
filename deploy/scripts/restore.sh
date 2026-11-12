#!/usr/bin/env bash
# =============================================================================
# 数据恢复
# 用法：
#   bash deploy/scripts/restore.sh list                     列出可用备份
#   bash deploy/scripts/restore.sh pg   <dump 文件路径>     恢复 PostgreSQL
#   bash deploy/scripts/restore.sh minio <备份目录路径>     恢复 MinIO 桶
# 说明：恢复为破坏性操作，执行前请先停止写入（停后端）并做一次当前备份
# =============================================================================
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

load_env
BACKUP_DIR="${BACKUP_DIR:-${DEPLOY_DIR}/backups}"
ACTION="${1:-}"

case "${ACTION}" in
  list)
    log "可用备份（${BACKUP_DIR}）："
    ls -lh "${BACKUP_DIR}" 2>/dev/null || warn "备份目录不存在"
    ;;

  pg)
    FILE="${2:-}"
    [ -n "${FILE}" ] || die "用法：restore.sh pg <dump 文件路径>"
    [ -f "${FILE}" ] || die "备份文件不存在：${FILE}"
    if [ -f "${FILE}.sha256" ]; then
      log "校验备份文件完整性"
      ( cd "$(dirname "${FILE}")" && sha256sum -c "$(basename "${FILE}").sha256" ) || die "校验失败，终止恢复"
    fi
    warn "即将恢复 PostgreSQL：${FILE}"
    warn "确认已停止业务写入，且已做当前数据备份（10 秒后开始，Ctrl+C 取消）"
    sleep 10
    log "停止后端，避免恢复期间写入"
    dc stop backend >/dev/null 2>&1 || true
    log "执行 pg_restore"
    dc exec -T postgres pg_restore \
      -U "${POSTGRES_USER}" \
      -d "${POSTGRES_DB}" \
      --clean --if-exists --no-owner --no-privileges < "${FILE}"
    log "恢复完成，重启后端"
    dc start backend
    wait_healthy 300 || warn "后端未在 300s 内恢复健康，请检查日志"
    log "PostgreSQL 恢复结束，请执行 verify.sh 复核"
    ;;

  minio)
    DIR="${2:-}"
    [ -d "${DIR}" ] || die "用法：restore.sh minio <备份目录路径>（目录内为桶对象文件）"
    warn "即将把 ${DIR} 同步回桶 ${MINIO_BUCKET}（10 秒后开始，Ctrl+C 取消）"
    sleep 10
    docker run --rm \
      --network "${COMPOSE_PROJECT_NAME:-pmp}_data" \
      -v "$(cd "${DIR}" && pwd):/backup:ro" \
      --entrypoint sh \
      "${MC_IMAGE:-minio/mc:RELEASE.2024-11-21T17-21-54Z}" \
      -c "mc alias set local http://minio:9000 '${MINIO_ROOT_USER}' '${MINIO_ROOT_PASSWORD}' >/dev/null \
          && mc mirror --overwrite --preserve /backup local/${MINIO_BUCKET}"
    log "MinIO 恢复结束"
    ;;

  *)
    echo "用法："
    echo "  bash $0 list"
    echo "  bash $0 pg <dump 文件路径>"
    echo "  bash $0 minio <备份目录路径>"
    exit 1
    ;;
esac
