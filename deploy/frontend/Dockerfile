# =============================================================================
# PMP 前端镜像：Node 构建 Vue 产物 → Nginx 静态资源 + 反向代理
# 构建上下文：仓库根目录（deploy/docker-compose.yml 中 context: ..）
# 构建命令：docker build -f deploy/frontend/Dockerfile -t pmp/frontend:1.0.0 .
# 规范：
#   1. 基础镜像按 tag 固定版本，禁止 latest；
#   2. 构建阶段与运行阶段分离，运行镜像不含 Node / 源码 / node_modules；
#   3. 配置文件不写进镜像，统一由 compose 挂载（nginx.conf + templates）；
#   4. 以非 root（nginx）运行，监听 8080（>1024 无需特权端口）；
#   5. 只读根文件系统运行时，临时目录与 conf.d 由 tmpfs 提供；
#   6. 支持通过 build-arg 指定 npm 镜像源（内网构建）。
# =============================================================================
ARG NODE_IMAGE=node:22-alpine
ARG NGINX_IMAGE=nginx:1.27.3-alpine

# ---------- 构建阶段 ----------
FROM ${NODE_IMAGE} AS build
WORKDIR /app

ARG NPM_REGISTRY=https://registry.npmjs.org

# 先复制依赖清单，利用 Docker 层缓存加速依赖安装
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm config set registry "${NPM_REGISTRY}" \
    && (npm ci --no-audit --no-fund || npm install --no-audit --no-fund)

COPY frontend/ ./
RUN npm run build

# ---------- 运行阶段 ----------
FROM ${NGINX_IMAGE}

LABEL org.opencontainers.image.title="pmp-frontend" \
      org.opencontainers.image.description="PMP 制造协同平台前端静态资源与反向代理" \
      org.opencontainers.image.vendor="PMP" \
      org.opencontainers.image.licenses="Proprietary"

# 默认 server 块由挂载的模板渲染，删除镜像内置配置避免端口/根路径冲突
RUN rm -f /etc/nginx/conf.d/default.conf

# 静态资源：Vite 构建产物
COPY --from=build --chown=nginx:nginx /app/dist/ /usr/share/nginx/html/

# 非 root 运行
USER nginx

EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=3s --retries=5 --start-period=10s \
  CMD wget -qO- http://127.0.0.1:8080/healthz | grep -q ok || exit 1
