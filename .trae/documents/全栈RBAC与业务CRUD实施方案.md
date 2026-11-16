# PMP 全栈 RBAC 与业务 CRUD 实施方案

## Context

当前项目可部署但不可业务使用：

- 前端 `docs/ui-demo` 是 70 页静态 Demo（原生 JS + 字符串模板），登录不校验、无 token、无持久化、分页/导出/批量/二次确认均为模拟。
- 后端仅有诊断接口（ping/meta/dependencies/checks），无用户、角色、菜单、权限与业务数据，依赖中无 Security / Validation / Flyway / ORM。
- 部署链路直接把静态目录复制进 Nginx，无 Node 构建阶段。

目标：按用户确认的选型，重构为 **Vue 3 + Vite + Element Plus** 前端、**Spring Security 6 + JWT 双令牌 + Redis 会话** 后端、**59 个业务列表页逐一建表建接口**，完整覆盖登录、菜单管理、角色管理与业务 CRUD，并通过全量测试后可直接上线。

## 已确认决策

| 决策项 | 结论 |
|---|---|
| 前端 | Vue 3 + TypeScript + Vite + Element Plus + Pinia + Vue Router + Axios + ECharts |
| 认证 | JWT Access 2h + Refresh 7d，Redis 保存会话/吊销/失败计数，BCrypt 密码 |
| 业务页 | 59 个列表页各自建表、各自 REST 接口，禁止共用通用业务表 |
| 视觉 | 沿用现有设计语言：主色 `#2563eb`、侧栏 `#0b1220`、圆角 10px |
| 元数据 | 从 `docs/ui-demo/assets/data.js` 一次性抽取页面/菜单/角色元数据，Vue 端以配置驱动复用 |

## 目标结构

### 前端 `frontend/`（新增）

```
frontend/
├── package.json / vite.config.ts / tsconfig.json / index.html
├── src/
│   ├── main.ts / App.vue
│   ├── styles/{tokens.css,element-overrides.scss}
│   ├── router/{index.ts,guard.ts,dynamic.ts}
│   ├── stores/{user.ts,permission.ts,app.ts}
│   ├── api/{client.ts,auth.ts,menu.ts,role.ts,user.ts,crud.ts,types.ts}
│   ├── components/crud/{CrudPage.vue,FilterBar.vue,DataTable.vue,FormDialog.vue,DetailDrawer.vue}
│   ├── components/{MenuTree.vue,IconPicker.vue,PageHeader.vue,PermButton.vue}
│   ├── directives/perm.ts
│   ├── meta/{pages.json,menu.json,roles.json,pageRegistry.ts}
│   └── views/{domain}/{pageId}/{index.vue,config.ts}   # 59 个薄壳页面
├── scripts/{import-demo-meta.mjs,gen-pages.mjs,validate-meta.mjs}
├── tests/            # Vitest
└── e2e/              # Playwright
```

### 后端 `deploy/backend/src/main/java/com/pmp/platform/`

```
auth/        # controller/service/jwt/filter/config（登录、刷新、登出、强制下线）
system/      # user/role/menu/dept/dict/log
biz/{rd,plan,purchase,prod,wms,oms,tms,crm,fin,data,platform,ops}/  # 59 页实体与接口
common/      # Result/PageResult/BaseEntity/BaseCrudService/异常/审计AOP/数据权限
api/         # 保留 PlatformController（verify.sh 依赖，不改动）
```

关键复用：
- 后端 `BaseEntity` + `BaseCrudService<E>` 统一分页、详情、增改、批量删、导出，子类只声明表与权限码。
- 前端 `CrudPage.vue` 统一列表/筛选/分页/批量/导出/表单/确认/提示/刷新，页面仅提供 `config.ts`。
- `gen-pages.mjs` 批量产出 59 个 `index.vue + config.ts`；`validate-meta.mjs` 校验页面数、路由、组件文件、权限码一一对应，替代现有 `tools/gen-inventory.js` 的页面完整性校验。

## 数据库设计

### 公共字段（所有业务表）

`id BIGINT IDENTITY PK`、`code VARCHAR(64)`、`created_by`、`created_at TIMESTAMPTZ`、`updated_by`、`updated_at`、`deleted SMALLINT DEFAULT 0`、`version INT DEFAULT 0`。

### RBAC 表（`app` schema）

| 表 | 关键字段/约束 |
|---|---|
| `sys_user` | username 唯一、password_hash、nickname、dept_id、phone、email、status、fail_count、locked_until、last_login_at/ip |
| `sys_role` | code 全局唯一、name、data_scope(ALL/DEPT/DEPT_AND_CHILD/SELF/CUSTOM)、status |
| `sys_menu` | parent_id、name、type(DIR/MENU/BUTTON/LINK)、path、component、icon、perm_code、sort、visible、external、status |
| `sys_dept` | parent_id、ancestors、name、sort、status |
| `sys_user_role` / `sys_role_menu` / `sys_role_dept` | 联合唯一约束 |
| `sys_login_log` | username、ip、ua、result(SUCCESS/FAIL/LOCKED/KICKED)、msg、created_at |
| `sys_oper_log` | user_id、module、action、uri、params、ip、cost_ms、result、trace_id |
| `sys_dict_type` / `sys_dict_item` | 字典管理 |
| `sys_page_resource` | page_id、table_name、api_prefix、perm_code（生成与种子输入） |

### Flyway

- 目录：`deploy/backend/src/main/resources/db/migration/`
- 配置：`baseline-on-migrate=true`、`baseline-version=0`、`schemas=app`、`default-schema=app`
- 脚本：`V1__rbac_core.sql`、`V2__rbac_seed.sql`（admin、17 角色、70 菜单、59 页面权限）、`V3+__biz_{page}.sql`（按批次）
- 与现有 `deploy/postgres/init/01-init.sql` 兼容：该脚本只负责 `CREATE SCHEMA app` 与自检表；业务 DDL 全部走 Flyway，禁止回写已执行迁移。

## 认证与安全

- 登录：`POST /api/v1/auth/login`；校验账号状态 → BCrypt → 失败计数 → 签发双令牌。
- Redis key：`pmp:auth:session:{sid}`、`pmp:auth:user:sessions:{userId}`、`pmp:auth:refresh:{jti}`、`pmp:auth:deny:{jti}`、`pmp:auth:fail:{username}`（15 分钟）、`pmp:auth:lock:{username}`（30 分钟）。
- 刷新：`POST /api/v1/auth/refresh` 校验 refresh jti + sid → 轮换双令牌并作废旧 refresh；Access 校验签名、exp、jti 未吊销、sid 一致。
- 异地登录：同账号新登录时旧 sid 入 deny 并记录 `KICKED`，旧端下一请求返回 401（code=KICKED）；提供开关 `AUTH_SINGLE_SESSION`。
- 锁定：15 分钟内失败 5 次锁定 30 分钟，写 `sys_login_log`。
- Spring Security 6：无状态、关闭 CSRF；`permitAll` 必须包含 `/api/v1/auth/login|refresh`、`/api/v1/ping|meta|dependencies|checks`、`/actuator/health/**`、`/actuator/prometheus`、`/error`，保证 `verify.sh` 与容器健康检查不受影响；其余 `authenticated()`，接口用 `@PreAuthorize`。
- 统一返回 `{code,msg,data,traceId}`；`GlobalExceptionHandler` 覆盖参数校验、业务、认证、系统异常；`@OperLog` AOP 异步落库。

## 前端关键机制

- Axios：`baseURL=/api/v1`，注入 Bearer 与 `X-Request-Id`，同请求 1s 内去重；解包统一响应。
- 401：单飞刷新队列，成功后重放；失败清空凭证跳转 `/login?redirect=`；403 提示无权限；500 统一提示。
- Pinia：`user` 持久化 token 与过期时间；`permission` 由 `/api/v1/auth/menus` 构建菜单树并 `router.addRoute` 动态注入。
- 路由守卫：白名单 `/login`；无 token 拦截；令牌将过期先刷新；`import.meta.glob` 校验组件存在；path 合法性 `^/[a-z0-9\-/]+$`；外链与隐藏菜单不注册路由。
- 菜单/权限：递归菜单树 + Element Plus 图标注册表（非法图标回退）+ `v-perm` 按钮级权限。
- 视觉：CSS tokens + Element Plus 变量覆盖，保持现有配色与圆角。

## 59 页落地批次

| 批次 | 范围 | 数量 |
|---|---|---|
| B0 平台基座 | iam、tenant-menu、audit、org、dict-param | 5 |
| B1 研发+计划 | 研发 5 + 计划 5 | 10 |
| B2 采购 | 采购 7 | 7 |
| B3 生产+仓储 | 生产 5 + 仓储 4 | 9 |
| B4 履约+物流 | 履约 4 + 物流 4 | 8 |
| B5 客户+财务+数据 | 客户 3 + 财务 1 + 数据 2 | 6 |
| B6 公共能力 | mdm、bpm、file、coding、notify、integration、gateway、event-bus、rule、scheduler | 10 |
| B7 运维+工作台 | cicd、config、todo、message | 4 |

每页固定交付物：Flyway 建表与索引、菜单/按钮权限种子、Entity/Mapper/Service/Controller/DTO、`config.ts + index.vue`、集成测试与 E2E 冒烟条目。

## 部署改造

- `deploy/frontend/Dockerfile`：`node:22-alpine` 构建（`npm ci && npm run build`）→ 复制 `dist/` 至 Nginx；支持 `NPM_REGISTRY`。
- `deploy/docker-compose.yml`：新增 `NODE_IMAGE`、`NPM_REGISTRY` 构建参数；backend 注入 `JWT_SECRET`、`AUTH_SINGLE_SESSION`、锁定阈值等。
- `.env.example` / `.env.{dev,test,prod}.example`：新增 JWT 与 Node 构建变量。
- `deploy/scripts/preflight.sh`：必需文件加入 `frontend/package.json`、`package-lock.json`、`vite.config.ts`、`db/migration`。
- `deploy/scripts/verify.sh`：静态断言从 `/assets/app.js` 改为构建产物（或新增 `/version.json`）；保留 4 个诊断接口匿名断言；新增未登录访问受保护接口返回 401、登录后访问成功两项断言。
- `deploy/scripts/backup.sh|restore.sh`：补充 `flyway_schema_history` 说明；恢复前清理 `app` schema。
- 升级：新 tag 构建 → 滚动升级 → verify 通过 → 缩容；回滚改镜像 tag（数据迁移采用 expand/contract）。

## 测试与验收

- 后端：`@SpringBootTest + Testcontainers(postgres:15.8, redis:7.4)`，覆盖登录成功/密码错/锁定/解锁、刷新轮换、吊销 401、异地登录踢出、越权 403、数据权限、分页筛选、校验失败、批量边界、导出。
- 前端：Vitest 覆盖刷新队列、路由守卫、`CrudPage` 交互；Playwright 覆盖登录→菜单→采购订单 CRUD→批量删除→导出→登出→回登录页。
- 部署验收（192.168.102.242）：`preflight.sh` → `build.sh` → `start.sh` → `verify.sh --full` → Playwright 冒烟 → 备份恢复演练。

## 分阶段实施

| 阶段 | 内容 | 可验证产物 |
|---|---|---|
| M1 最小闭环 | Vue 工程骨架、Flyway RBAC、登录/刷新/登出、菜单接口、动态路由、`purchase-order` 真实 CRUD | 可登录并按权限看到菜单，采购订单可增删改查 |
| M2 权限域 | 用户/角色/菜单/部门管理、数据权限、操作/登录日志、强制下线 | 角色分配即时生效，越权返回 403，踢出生效 |
| M3 批次 B1+B2 | 研发/计划/采购共 17 页 | 每页 CRUD 与集成测试通过 |
| M4 批次 B3+B4+B5 | 生产/仓储/履约/物流/客户/财务/数据共 23 页 | 同上 |
| M5 批次 B6+B7 | 公共能力/运维/工作台共 14 页 | 同上 |
| M6 全量回归 | 异常边界、导出性能、部署验收与回滚演练 | `verify.sh --full` 全绿 + E2E 全通过 |

## 风险与规避

| 风险 | 规避 |
|---|---|
| Flyway 在已有库基线失败 | `baseline-on-migrate` + version 0；只读校验历史表，禁止手工改库 |
| 59 页重复代码膨胀 | B0 先固化模板，生成器批量产出，基类承担通用逻辑 |
| verify.sh 因认证失败 | 白名单覆盖现有诊断接口，断言改造与后端同批交付 |
| 离线环境拉不到 Node 镜像 | `.env` 固定镜像 tag，支持私服与 `docker save/load` |
| Element Plus 视觉偏差 | M1 定稿 tokens 与覆盖样式，作为后续页面基线 |
| 大文件导出超时 | 后端流式导出，超 5 万行转异步任务 |
| 重复提交/并发写 | 前端 loading+去重，后端唯一约束 + `X-Request-Id` 幂等 |

## 关键文件

- `docs/ui-demo/assets/data.js`（元数据来源，冻结只读）
- `deploy/backend/pom.xml`、`src/main/resources/application.yml`
- `deploy/backend/src/main/java/com/pmp/platform/{auth,system,biz,common}/`
- `deploy/backend/src/main/resources/db/migration/`
- `deploy/frontend/Dockerfile`、`deploy/frontend/nginx/templates/default.conf.template`
- `deploy/docker-compose.yml`、`deploy/.env*.example`
- `deploy/scripts/{preflight,verify,backup,restore}.sh`
- 新增 `frontend/`（Vue 工程）

## 验证方式

1. 后端单测与集成测试：`cd deploy/backend && mvn test`。
2. 前端构建与单测：`cd frontend && npm ci && npm run build && npm run test:unit`。
3. E2E：`npm run test:e2e`（针对本地 compose 环境）。
4. 部署验收：在 192.168.102.242 执行 `bash deploy/scripts/preflight.sh && bash deploy/scripts/build.sh && bash deploy/scripts/start.sh && bash deploy/scripts/verify.sh --full`。
5. 手工冒烟：管理员登录 → 菜单管理增改拖拽 → 角色分配菜单/数据权限 → 新建用户绑定角色 → 切换角色验证菜单与按钮 → 各业务页新增/编辑/删除/批量/导出。
