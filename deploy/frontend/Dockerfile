# =============================================================================
# PMP 前端镜像：Nginx 静态资源 + 反向代理
# 构建上下文：仓库根目录（deploy/docker-compose.yml 中 context: ..）
# 构建命令：docker build -f deploy/frontend/Dockerfile -t pmp/frontend:1.0.0 .
# 规范：
#   1. 基础镜像按 tag 固定版本，禁止 latest；
#   2. 配置文件不写进镜像，统一由 compose 挂载（nginx.conf + templates）；
#   3. 以非 root（nginx）运行，监听 8080（>1024 无需特权端口）；
#   4. 只读根文件系统运行时，临时目录与 conf.d 由 tmpfs 提供。
# =============================================================================
ARG NGINX_IMAGE=nginx:1.27.3-alpine
FROM ${NGINX_IMAGE}

LABEL org.opencontainers.image.title="pmp-frontend" \
      org.opencontainers.image.description="PMP 制造协同平台前端静态资源与反向代理" \
      org.opencontainers.image.vendor="PMP" \
      org.opencontainers.image.licenses="Proprietary"

# 默认 server 块由挂载的模板渲染，删除镜像内置配置避免端口/根路径冲突
RUN rm -f /etc/nginx/conf.d/default.conf

# 静态资源：UI Demo 产物（真实项目替换为 dist 构建产物目录）
COPY --chown=nginx:nginx docs/ui-demo/ /usr/share/nginx/html/

# 非 root 运行
USER nginx

EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=3s --retries=5 --start-period=10s \
  CMD wget -qO- http://127.0.0.1:8080/healthz | grep -q ok || exit 1
