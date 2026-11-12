-- =============================================================================
-- PMP PostgreSQL 初始化脚本（仅在数据卷为空时执行一次）
-- 挂载路径：deploy/postgres/init → /docker-entrypoint-initdb.d（只读）
-- 说明：业务表结构由 Flyway/Liquibase 管理，此处只做基线与自检对象。
-- =============================================================================

-- 业务 schema（业务表统一建在 app 下，避免与扩展/工具表混用 public）
CREATE SCHEMA IF NOT EXISTS app;

-- 部署自检表：用于验证连接、权限与持久化是否生效
CREATE TABLE IF NOT EXISTS app.deploy_check (
    id          BIGSERIAL PRIMARY KEY,
    check_key   VARCHAR(64)  NOT NULL UNIQUE,
    check_value VARCHAR(256) NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

COMMENT ON TABLE  app.deploy_check            IS '部署自检表：服务连通与数据持久化验证';
COMMENT ON COLUMN app.deploy_check.check_key  IS '检查项唯一键';
COMMENT ON COLUMN app.deploy_check.check_value IS '检查项取值';

INSERT INTO app.deploy_check (check_key, check_value)
VALUES ('schema_version', '1.0.0'),
       ('init_source', 'docker-entrypoint-initdb.d/01-init.sql')
ON CONFLICT (check_key) DO NOTHING;

-- 限制 public schema 的默认建表权限，降低误建表风险
REVOKE CREATE ON SCHEMA public FROM PUBLIC;

-- 只读审计账号（可选）：按需取消注释并设置强密码后使用
-- CREATE ROLE pmp_ro LOGIN PASSWORD 'REPLACE_BY_SECRET_MANAGER';
-- GRANT CONNECT ON DATABASE pmp TO pmp_ro;
-- GRANT USAGE ON SCHEMA app TO pmp_ro;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA app GRANT SELECT ON TABLES TO pmp_ro;
