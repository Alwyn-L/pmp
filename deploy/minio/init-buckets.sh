#!/bin/sh
# =============================================================================
# MinIO 初始化：创建业务桶并开启版本控制
# 由 minio-init 一次性容器执行（restart: "no"），幂等可重复运行
# =============================================================================
set -eu

MINIO_ENDPOINT="${MINIO_ENDPOINT:-http://minio:9000}"
MINIO_BUCKET="${MINIO_BUCKET:-pmp-files}"

echo "[minio-init] waiting for ${MINIO_ENDPOINT} ..."
i=0
until mc alias set local "${MINIO_ENDPOINT}" "${MINIO_ROOT_USER}" "${MINIO_ROOT_PASSWORD}" >/dev/null 2>&1; do
    i=$((i + 1))
    if [ "${i}" -ge 30 ]; then
        echo "[minio-init] ERROR: cannot connect to MinIO after ${i} attempts" >&2
        exit 1
    fi
    sleep 2
done

echo "[minio-init] creating bucket: ${MINIO_BUCKET}"
mc mb --ignore-existing "local/${MINIO_BUCKET}"

echo "[minio-init] disable anonymous access"
mc anonymous set none "local/${MINIO_BUCKET}" >/dev/null 2>&1 || true

echo "[minio-init] enable object versioning"
mc version enable "local/${MINIO_BUCKET}" >/dev/null 2>&1 || echo "[minio-init] WARN: versioning not enabled (mc too old)"

echo "[minio-init] done"
mc ls "local/${MINIO_BUCKET}"
