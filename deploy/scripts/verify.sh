#!/usr/bin/env bash
# =============================================================================
# 部署验证：服务健康、接口链路、静态资源、资源占比；--full 追加持久化与自愈验证
# 用法：bash deploy/scripts/verify.sh [--full]
# 退出码：0 全部通过；1 存在失败项
# =============================================================================
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

FULL=0
[ "${1:-}" = "--full" ] && FULL=1

load_env
BASE="http://127.0.0.1:${HTTP_PORT:-80}"
PASS=0
FAIL=0

ok() { printf '  [ OK ] %s\n' "$*"; PASS=$((PASS + 1)); }
ng() { printf '  [FAIL] %s\n' "$*"; FAIL=$((FAIL + 1)); }

echo "=============================================================="
echo " PMP 部署验证（入口 ${BASE}）"
echo "=============================================================="

TMP_PROFILE="$(mktemp)"
trap 'rm -f "${TMP_PROFILE}"' EXIT

# ---------- 1. 容器健康 ----------
echo "[1/6] 容器健康状态"
while read -r svc state health; do
  [ -n "${svc:-}" ] || continue
  if [ -n "${health:-}" ] && [ "${health}" != "<no value>" ]; then
    [ "${health}" = "healthy" ] && ok "${svc}: healthy" || ng "${svc}: ${health}"
  else
    [ "${state}" = "running" ] && ok "${svc}: running" || ng "${svc}: ${state}"
  fi
done <<< "$(dc ps --format '{{.Service}} {{.State}} {{.Health}}' 2>/dev/null || true)"

# ---------- 2. 资源配额与占用 ----------
echo "[2/6] 资源配额与占用"
for id in $(dc ps -q 2>/dev/null); do
  name="$(docker inspect -f '{{.Name}}' "${id}" | sed 's#^/##')"
  mem_limit="$(docker inspect -f '{{.HostConfig.Memory}}' "${id}" 2>/dev/null || echo 0)"
  cpu_limit="$(docker inspect -f '{{.HostConfig.NanoCpus}}' "${id}" 2>/dev/null || echo 0)"
  if [ "${mem_limit:-0}" = "0" ] || [ "${cpu_limit:-0}" = "0" ]; then
    ng "${name} 未设置 CPU/内存上限"
  else
    ok "${name} 已设置上限（内存 $((mem_limit / 1024 / 1024)) MB / CPU $(awk -v n="${cpu_limit}" 'BEGIN{printf "%.1f", n/1e9}') 核）"
  fi
done
echo "  当前占用："
docker stats --no-stream --format '    {{.Name}}  CPU {{.CPUPerc}}  MEM {{.MemUsage}} ({{.MemPerc}})' || true
over="$(docker stats --no-stream --format '{{.Name}} {{.MemPerc}}' 2>/dev/null | awk '$2+0 > 90 {print $1"("$2")"}')"
if [ -n "${over}" ]; then ng "内存占用超过上限 90%：${over}"; else ok "全部容器内存占用低于上限 90%"; fi

# ---------- 3. 前端静态资源 ----------
echo "[3/6] 前端静态资源"
code="$(http_code "${BASE}/")"
[ "${code}" = "200" ] && ok "首页返回 200" || ng "首页返回 ${code}"
body="$(curl -fsS --max-time 10 "${BASE}/" 2>/dev/null | head -c 4000 || true)"
if printf '%s' "${body}" | grep -qi 'PMP'; then ok "首页内容包含平台标识"; else ng "首页内容异常（未匹配到平台标识）"; fi

# 构建产物必须被 index.html 引用且可访问（Vite 产物为带 hash 的 /assets/*.js）
asset="$(printf '%s' "${body}" | grep -o '/assets/[A-Za-z0-9._-]*\.js' | head -n1 || true)"
if [ -n "${asset}" ]; then
  code="$(http_code "${BASE}${asset}")"
  [ "${code}" = "200" ] && ok "构建产物 ${asset} 返回 200" || ng "构建产物 ${asset} 返回 ${code}"
else
  ng "首页未引用 /assets/*.js，前端产物可能不是构建版本"
fi

ver="$(curl -fsS --max-time 10 "${BASE}/version.json" 2>/dev/null || true)"
if printf '%s' "${ver}" | tr -d ' \n\r\t' | grep -q '"service":"pmp-frontend"'; then
  ok "version.json 可访问：$(printf '%s' "${ver}" | tr -d '\n' | head -c 120)"
else
  ng "version.json 异常（未匹配到前端版本标识）：$(printf '%s' "${ver}" | head -c 120)"
fi

# ---------- 4. 健康检查与安全边界 ----------
echo "[4/6] 健康检查与安全边界"
resp="$(curl -fsS --max-time 10 "${BASE}/healthz" 2>/dev/null || true)"
printf '%s' "${resp}" | grep -q 'ok' && ok "GET /healthz -> ok" || ng "GET /healthz 异常：${resp}"
code="$(http_code "${BASE}/actuator/health")"
[ "${code}" = "404" ] && ok "外部访问 /actuator/health 已被拦截（404）" || ng "管理端点暴露风险：/actuator/health 返回 ${code}"
code="$(http_code "${BASE}/api/v1/auth/profile")"
[ "${code}" = "401" ] && ok "未登录访问受保护接口返回 401" || ng "未登录访问 /api/v1/auth/profile 返回 ${code}（期望 401）"

# ---------- 5. 前后端与中间件链路 ----------
echo "[5/6] 前后端与中间件链路"
resp="$(curl -fsS --max-time 10 "${BASE}/api/v1/ping" 2>/dev/null || true)"
printf '%s' "${resp}" | grep -q '"status":"ok"' && ok "GET /api/v1/ping -> ok" || ng "后端 ping 异常：${resp}"
resp="$(curl -fsS --max-time 15 "${BASE}/api/v1/meta" 2>/dev/null || true)"
printf '%s' "${resp}" | grep -q '"service":"pmp-backend"' && ok "GET /api/v1/meta -> ${resp}" || ng "后端 meta 异常：${resp}"
resp="$(curl -fsS --max-time 20 "${BASE}/api/v1/dependencies" 2>/dev/null || true)"
if printf '%s' "${resp}" | grep -q '"overall":"UP"'; then
  ok "依赖连通性：postgres / redis / kafka / minio 全部 up"
elif printf '%s' "${resp}" | grep -q '"overall":"DEGRADED"'; then
  ng "依赖连通性异常：${resp}"
else
  ng "依赖连通性接口无响应：${resp}"
fi

# 认证闭环：管理员登录签发令牌 -> 携带令牌读取当前用户
VERIFY_USER="${VERIFY_USERNAME:-admin}"
VERIFY_PASS="${VERIFY_PASSWORD:-${AUTH_ADMIN_PASSWORD:-Admin@123}}"
json_escape() { printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'; }
login_body="{\"username\":\"$(json_escape "${VERIFY_USER}")\",\"password\":\"$(json_escape "${VERIFY_PASS}")\"}"
login_resp="$(curl -sS --max-time 15 -H 'Content-Type: application/json' \
  -d "${login_body}" "${BASE}/api/v1/auth/login" 2>/dev/null || true)"
access_token="$(printf '%s' "${login_resp}" | sed -n 's/.*"accessToken":"\([^"]*\)".*/\1/p')"
if [ -n "${access_token}" ]; then
  ok "账号 ${VERIFY_USER} 登录成功并签发 accessToken"

  prof_code="$(curl -s -o "${TMP_PROFILE}" -w '%{http_code}' --max-time 15 \
    -H "Authorization: Bearer ${access_token}" "${BASE}/api/v1/auth/profile" 2>/dev/null || echo 000)"
  if [ "${prof_code}" = "200" ] && grep -q "\"username\":\"${VERIFY_USER}\"" "${TMP_PROFILE}"; then
    ok "携带令牌访问 /api/v1/auth/profile 成功（HTTP 200）"
  else
    ng "携带令牌访问 /api/v1/auth/profile 失败（HTTP ${prof_code}）：$(head -c 200 "${TMP_PROFILE}" 2>/dev/null || true)"
  fi

  menus_code="$(http_code_with_token "${BASE}/api/v1/auth/menus" "${access_token}")"
  [ "${menus_code}" = "200" ] && ok "携带令牌访问 /api/v1/auth/menus 成功（HTTP 200）" || ng "菜单接口异常（HTTP ${menus_code}）"
else
  ng "账号 ${VERIFY_USER} 登录失败：$(printf '%s' "${login_resp}" | head -c 200)"
fi

# ---------- 6. 持久化与自愈（可选） ----------
echo "[6/6] 持久化与自愈验证"
if [ "${FULL}" -ne 1 ]; then
  echo "  [SKIP] 未加 --full，跳过重启持久化与异常自愈验证"
else
  before="$(curl -fsS --max-time 10 "${BASE}/api/v1/checks" 2>/dev/null | sed -n 's/.*"count":\([0-9]\+\).*/\1/p')"
  if [ -n "${before}" ]; then
    ok "重启前持久化记录数：${before}"
  else
    ng "无法读取 /api/v1/checks，跳过持久化验证"
  fi

  log "重启 postgres 与 backend ..."
  dc restart postgres redis backend >/dev/null
  if wait_healthy 300; then ok "重启后服务恢复健康"; else ng "重启后服务未恢复健康"; fi

  after="$(curl -fsS --max-time 10 "${BASE}/api/v1/checks" 2>/dev/null | sed -n 's/.*"count":\([0-9]\+\).*/\1/p')"
  if [ -n "${before}" ] && [ "${before}" = "${after}" ]; then
    ok "重启前后持久化数据一致（count=${after}）"
  else
    ng "重启前后数据不一致（before=${before:-?} after=${after:-?}）"
  fi

  # Docker 29+ 将宿主侧 docker kill 视作主动停止，不触发 restart 策略；
  # 这里用容器内 SIGTERM 终止主进程，模拟真实进程崩溃/被杀的场景。
  log "模拟后端进程异常终止（容器内 SIGTERM 主进程）..."
  backend_id="$(dc ps -q backend | head -n1)"
  before_restart="$(docker inspect -f '{{.RestartCount}}' "${backend_id}" 2>/dev/null || echo 0)"
  dc exec -T backend sh -c 'kill -TERM 1' >/dev/null 2>&1 || true
  sleep 5
  if wait_healthy 180; then
    after_restart="$(docker inspect -f '{{.RestartCount}}' "${backend_id}" 2>/dev/null || echo 0)"
    ok "进程异常终止后自动恢复（RestartCount ${before_restart} -> ${after_restart}）"
  else
    ng "进程异常终止后未自动恢复"
  fi
fi

echo "=============================================================="
echo " 验证结果：通过 ${PASS} 项，失败 ${FAIL} 项"
echo "=============================================================="
[ "${FAIL}" -eq 0 ] || exit 1
