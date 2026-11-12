#!/usr/bin/env bash
# =============================================================================
# 数据备份：PostgreSQL 逻辑备份 + MinIO 对象桶镜像 + 校验清单
# 用法：bash deploy/scripts/backup.sh [备份目录]
# 建议：由 cron / systemd timer 每日 02:00 执行，并同步到异地存储
#   crontab: 0 2 * * * /opt/pmp/deploy/scripts/backup.sh >> /var/log/pmp-backup.log 2>&1
# =============================================================================
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

load_env
BACKUP_DIR="${1:-${BACKUP_DIR:-${DEPLOY_DIR}/backups}}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"
STAMP="$(date '+%Y%m%d-%H%M%S')"

mkdir -p "${BACKUP_DIR}"
log "备份目录：${BACKUP_DIR}"
log "保留天数：${RETENTION_DAYS}"

# ---------- 1. PostgreSQL ----------
PG_FILE="${BACKUP_DIR}/pg-${STAMP}.dump"
log "导出 PostgreSQL：${PG_FILE}"
dc exec -T postgres pg_dump \
  -U "${POSTGRES_USER}" \
  -d "${POSTGRES_DB}" \
  -Fc --no-owner --no-privileges > "${PG_FILE}"

if [ -s "${PG_FILE}" ]; then
  log "PostgreSQL 备份完成：$(du -h "${PG_FILE}" | cut -f1)"
else
  die "PostgreSQL 备份文件为空，请检查数据库连接"
fi

# ---------- 2. MinIO 对象桶 ----------
MINIO_DIR="${BACKUP_DIR}/minio-${STAMP}"
mkdir -p "${MINIO_DIR}"
log "同步 MinIO 桶 ${MINIO_BUCKET} -> ${MINIO_DIR}"
docker run --rm \
  --network "${COMPOSE_PROJECT_NAME:-pmp}_data" \
  -v "${MINIO_DIR}:/backup" \
  --entrypoint sh \
  "${MC_IMAGE:-minio/mc:RELEASE.2024-11-21T17-21-54Z}" \
  -c "mc alias set local http://minio:9000 '${MINIO_ROOT_USER}' '${MINIO_ROOT_PASSWORD}' >/dev/null \
      && mc mirror --overwrite --preserve local/${MINIO_BUCKET} /backup" \
  || die "MinIO 同步失败，请确认 minio 容器健康"

log "MinIO 备份完成：$(du -sh "${MINIO_DIR}" | cut -f1)"

# ---------- 3. 校验清单 ----------
( cd "${BACKUP_DIR}" && sha256sum "pg-${STAMP}.dump" > "pg-${STAMP}.dump.sha256" )
log "已生成校验文件：pg-${STAMP}.dump.sha256"

# ---------- 4. 过期清理 ----------
log "清理 ${RETENTION_DAYS} 天前的备份"
find "${BACKUP_DIR}" -maxdepth 1 -mtime "+${RETENTION_DAYS}" -name 'pg-*' -exec rm -rf {} + 2>/dev/null || true
find "${BACKUP_DIR}" -maxdepth 1 -mtime "+${RETENTION_DAYS}" -name 'minio-*' -exec rm -rf {} + 2>/dev/null || true

log "备份完成"
ls -lh "${BACKUP_DIR}" | tail -n 10
