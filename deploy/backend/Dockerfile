# =============================================================================
# PMP 后端镜像：多阶段构建（Maven 编译 → JRE 运行）
# 构建上下文：deploy/backend（compose 中 context: ./backend）
# 规范：
#   1. 构建阶段与运行阶段分离，运行镜像不含 JDK / Maven / 源码；
#   2. 运行阶段使用固定 tag 的 JRE Alpine 镜像，禁止 latest；
#   3. 非 root（uid 10001）运行，配合只读根文件系统 + tmpfs /tmp；
#   4. 仅暴露 8080，由 compose 内部网络访问，不映射宿主机端口；
#   5. 支持通过 build-arg 指定 Maven 私服镜像（内网构建）。
# =============================================================================
ARG MAVEN_IMAGE=maven:3.9.9-eclipse-temurin-21
ARG JRE_IMAGE=eclipse-temurin:21-jre-alpine
ARG APP_UID=10001

# ---------- 构建阶段 ----------
FROM ${MAVEN_IMAGE} AS build
WORKDIR /workspace

# 先复制 pom，利用 Docker 层缓存加速依赖下载
COPY pom.xml ./
RUN mvn -B -ntp -DskipTests dependency:go-offline

COPY src ./src
RUN mvn -B -ntp -DskipTests package \
    && cp target/pmp-backend.jar /workspace/app.jar

# ---------- 运行阶段 ----------
FROM ${JRE_IMAGE}

ARG APP_UID=10001
LABEL org.opencontainers.image.title="pmp-backend" \
      org.opencontainers.image.description="PMP 制造协同平台后端服务" \
      org.opencontainers.image.vendor="PMP" \
      org.opencontainers.image.licenses="Proprietary"

RUN addgroup -S -g ${APP_UID} app \
    && adduser -S -u ${APP_UID} -G app -h /app -s /sbin/nologin app \
    && mkdir -p /app \
    && chown -R app:app /app

WORKDIR /app
COPY --from=build --chown=app:app /workspace/app.jar /app/app.jar

ENV TZ=Asia/Shanghai \
    JAVA_OPTS="-XX:MaxRAMPercentage=70 -XX:+ExitOnOutOfMemoryError -XX:+UseG1GC -Djava.io.tmpdir=/tmp"

USER app
EXPOSE 8080

# exec 形式保证 Java 进程为 PID 1，可正确接收 SIGTERM 实现优雅停机
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar /app/app.jar"]

HEALTHCHECK --interval=15s --timeout=5s --retries=10 --start-period=60s \
  CMD wget -qO- http://127.0.0.1:8080/actuator/health/readiness | grep -q UP || exit 1
