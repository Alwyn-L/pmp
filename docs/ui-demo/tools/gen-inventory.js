/* 生成《UI页面清单与设计说明.md》并执行完整性校验 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'assets', 'data.js');
const { ROLES, MENU, PAGES, CAPABILITIES } = require(dataPath);
const source = fs.readFileSync(dataPath, 'utf8');

const ALL = '';
const pageIds = Object.keys(PAGES);
const menuIds = [];
MENU.forEach(g => g.items.forEach(it => menuIds.push(it[0])));
const roleName = id => (ROLES.find(r => r.id === id) || { name: id }).name;
const can = (roles, role) => !roles || !Array.isArray(roles) || roles.includes(ALL) || role === 'admin' || roles.includes(role);
const rolesText = roles => (!roles ? '页面可见角色' : typeof roles === 'string' ? roleName(roles) : roles.includes(ALL) ? '全部登录用户' : roles.map(roleName).join('、'));
const esc = v => String(v == null ? '' : v).replace(/\|/g, '\\|').replace(/\n/g, ' ');

const typeName = t => ({ workbench: '工作台', dashboard: '数据看板', list: '列表管理', monitor: '监控', search: '搜索', profile: '个人中心', error: '异常状态' }[t] || t);

/* ---------- 校验 ---------- */
const checks = [];
const addCheck = (name, pass, detail) => checks.push({ name, pass, detail });

const missingPages = [...new Set(menuIds.filter(id => !PAGES[id]))];
addCheck('导航 → 页面可解析', missingPages.length === 0, missingPages.length ? '缺失页面：' + missingPages.join('、') : `${menuIds.length} 个导航项全部指向已定义页面`);

const notInMenu = pageIds.filter(id => menuIds.indexOf(id) < 0);
addCheck('页面 → 导航全覆盖', notInMenu.length === 0, notInMenu.length ? '未挂载页面：' + notInMenu.join('、') : `${pageIds.length} 个页面均已挂载到菜单`);

const dupNav = menuIds.filter((id, i) => menuIds.indexOf(id) !== i);
const pageCounts = {};
for (const m of source.matchAll(/P\('([^']+)'/g)) pageCounts[m[1]] = (pageCounts[m[1]] || 0) + 1;
const dupPage = Object.keys(pageCounts).filter(k => pageCounts[k] > 1);
addCheck('页面 ID 唯一性', dupNav.length === 0 && dupPage.length === 0, dupNav.length + dupPage.length ? '重复：' + [...new Set(dupNav.concat(dupPage))].join('、') : '菜单与页面定义均无重复 ID');

const metaBad = pageIds.filter(id => {
  const p = PAGES[id];
  return !p.mod || !p.title || !p.desc || !p.roles || !Array.isArray(p.jump);
});
addCheck('页面元数据完整性', metaBad.length === 0, metaBad.length ? '缺失 mod/title/desc/roles/jump：' + metaBad.join('、') : '全部页面均具备模块、标题、说明、角色、跳转定义');

const listBad = pageIds.filter(id => {
  const p = PAGES[id];
  if (p.type !== 'list') return false;
  if (p.tabs) return !p.tabs.every(t => t.cols && t.sample && t.cols.length);
  return !(p.cols && p.cols.length && p.sample);
});
addCheck('列表页数据完整性', listBad.length === 0, listBad.length ? '缺少列或样例数据：' + listBad.join('、') : '全部列表页均具备列定义与行数据模板（含多页签）');

const dashBad = pageIds.filter(id => {
  const p = PAGES[id];
  if (p.type !== 'dashboard' && p.type !== 'monitor') return false;
  return !((p.kpis && p.kpis.length) || (p.charts && p.charts.length) || p.chart);
});
addCheck('看板 / 监控页数据完整性', dashBad.length === 0, dashBad.length ? '缺少 KPI 或图表：' + dashBad.join('、') : '全部看板与监控页均具备 KPI 或图表数据');

const errPage = PAGES.error;
addCheck('异常状态覆盖', !!(errPage && errPage.states && errPage.states.length >= 6), errPage ? `覆盖 ${errPage.states.length} 种状态：${errPage.states.map(s => s[0]).join(' / ')}` : '缺少异常页');

const roleIdSet = new Set(ROLES.map(r => r.id).concat([ALL]));
const roleList = r => (!r ? [] : typeof r === 'string' ? [r] : r);
const badRole = [];
pageIds.forEach(id => {
  const p = PAGES[id];
  roleList(p.roles).forEach(r => { if (!roleIdSet.has(r)) badRole.push(id + ':' + r); });
  (p.actions || []).concat(p.rowActions || []).forEach(a => { roleList(a[2]).forEach(r => { if (!roleIdSet.has(r)) badRole.push(id + ':' + r); }); });
});
addCheck('角色引用有效性', badRole.length === 0, badRole.length ? '未定义角色：' + badRole.join('、') : `${ROLES.length} 个角色均被正确引用`);

const capBad = CAPABILITIES.filter(c => !c[1].every(id => PAGES[id]));
addCheck('架构能力 → 页面覆盖', capBad.length === 0, capBad.length ? '能力缺页：' + capBad.map(c => c[0]).join('、') : `${CAPABILITIES.length} 项架构能力均有页面承接`);

const capKinds = ['专属', '借用', 'N/A'];
const kindCount = k => CAPABILITIES.filter(c => c[2] === k).length;
const capKindBad = CAPABILITIES.filter(c => !capKinds.includes(c[2]) || (c[2] !== '专属' && !c[3]));
addCheck('能力承接方式标注', capKindBad.length === 0, capKindBad.length ? '承接方式缺失或未说明：' + capKindBad.map(c => c[0]).join('、') : `专属 ${kindCount('专属')} 项、借用 ${kindCount('借用')} 项、N/A ${kindCount('N/A')} 项，借用与 N/A 均附边界说明`);

const domains = ['研发协同', '计划', '采购', '生产', '仓储', '履约', '物流', '客户', '财务协同'];
const domBad = domains.filter(d => !pageIds.some(id => PAGES[id].mod === d));
addCheck('九大业务域覆盖', domBad.length === 0, domBad.length ? '缺少业务域：' + domBad.join('、') : '研发、计划、采购、生产、仓储、履约、物流、客户、财务协同均有页面');

const allPass = checks.every(c => c.pass);

/* ---------- 统计 ---------- */
const visibleCount = role => pageIds.filter(id => can(PAGES[id].roles, role)).length;
const fieldsPages = pageIds.filter(id => PAGES[id].fields && PAGES[id].fields.length);
const actionsTotal = pageIds.reduce((n, id) => n + ((PAGES[id].actions || []).length), 0);
const rowActionsTotal = pageIds.reduce((n, id) => n + ((PAGES[id].rowActions || []).length), 0);
const capsFor = id => CAPABILITIES.filter(c => c[1].indexOf(id) >= 0).map(c => c[0]);

/* ---------- 生成 Markdown ---------- */
const L = [];
const push = (...lines) => lines.forEach(l => L.push(l));

push('# PMP 制造协同平台 · UI 页面清单与设计说明（V1.0）', '');
push('> **设计依据**：《系统整合架构设计方案-V1.0.md》第 2 章能力分层、第 3 章实施范围、附录 A 能力拆分清单。');
push('> **交付物**：可直接预览的全量 UI Demo（`docs/ui-demo/`）+ 本清单文档。');
push('> **预览入口**：`docs/ui-demo/index.html`（双击即可打开；建议 1920×1080 及以上分辨率）。', '');
push('## 一、交付概览', '');
push('| 指标 | 数量 | 说明 |', '|---|---|---|');
push(`| UI 页面 | ${pageIds.length} | 覆盖 9 大业务域、公共能力、运维管控、系统管理、帮助与异常 |`);
push(`| 菜单分组 | ${MENU.length} | 左侧导航一级分组 |`);
push(`| 用户角色 | ${ROLES.length} | 页面级 + 按钮级 + 数据范围三层权限 |`);
push(`| 架构能力 | ${CAPABILITIES.length} | 对应架构附录 A 能力拆分清单 |`);
push(`| 能力承接方式 | 专属 ${kindCount('专属')} / 借用 ${kindCount('借用')} / N/A ${kindCount('N/A')} | 借用与 N/A 均为间接承接，已在第六章标注边界 |`);
push(`| 页面顶部操作 | ${actionsTotal} | 新建、审批、导出、批量处理等 |`);
push(`| 行内操作 | ${rowActionsTotal} | 查看、编辑、审批、执行、回滚等 |`);
push(`| 字段级说明页面 | ${fieldsPages.length} | 关键页显式定义字段规则，其余页面按列自动生成 |`, '');
push('页面类型分布：' + Object.keys(pageIds.reduce((m, id) => { const t = typeName(PAGES[id].type); m[t] = (m[t] || 0) + 1; return m; }, {})).map(k => {
  const m = pageIds.reduce((mm, id) => { const t = typeName(PAGES[id].type); mm[t] = (mm[t] || 0) + 1; return mm; }, {});
  return `${k} ${m[k]} 个`;
}).join(' · '), '');

push('## 二、统一视觉与交互规范', '');
push('| 规范项 | 定义 |', '|---|---|');
push('| 主色 / 辅助色 | 主色 #2563eb，信息 #06b6d4，成功 #16a34a，预警 #d97706，危险 #dc2626 |');
push('| 背景 / 面板 | 页面背景 #f4f6fb，内容面板 #ffffff，侧边栏 #0b1220 渐变 |');
push('| 圆角 / 阴影 | 卡片圆角 10px，控件 7~8px；卡片阴影极轻，抽屉使用 40px 投影 |');
push('| 字号 | 页面标题 21px / 卡片标题 14px / 正文 13px / 辅助说明 11~12px |');
push('| 布局 | 左侧 248px 导航 + 60px 顶栏 + 自适应内容区，基准 1920×1080 |');
push('| 表格 | 表头吸顶、首列强调、编码等宽字体、状态色标签、行内操作右置 |');
push('| 看板 | KPI 卡片 + SVG 折线/柱状/环形图，无外部图表依赖 |');
push('| 交互 | 全局搜索 Ctrl+K、角色切换即时重算权限、抽屉承载详情/表单/审批/页面说明 |');
push('| 异常 | 403/404/500/维护/断网/空数据 六态统一文案与视觉 |', '');
push('**关键操作路径标注**：每个页面标题下方提供“关键路径”快捷跳转（如 BOM → ECN → 工艺路线），点击直达目标页面；右上角“页面说明”抽屉列出完整跳转清单与业务流转规则。', '');

push('## 三、角色权限模型', '');
push('权限规则：页面 `roles` 控制可见性；按钮 `roles` 控制可操作性；系统管理员（admin）始终可见全部页面与操作；未配置按钮角色的操作对页面可见角色开放。', '');
push('| 角色 | 职责 | 可见页面数 | 可见模块 |', '|---|---|---|---|');
ROLES.forEach(r => {
  const vis = pageIds.filter(id => can(PAGES[id].roles, r.id));
  const mods = [...new Set(vis.map(id => PAGES[id].mod))];
  push(`| ${r.name}（${r.id}） | ${esc(r.desc)} | ${vis.length} | ${esc(mods.join('、'))} |`);
});
push('');

push('## 四、全量页面清单', '');
let seq = 0;
MENU.forEach((group, gi) => {
  const items = group.items.filter(it => PAGES[it[0]]);
  if (!items.length) return;
  push(`### 4.${gi + 1} ${group.g}（${items.length} 个页面）`, '');
  push('| # | 页面 ID | 路由 | 页面名称 | 类型 | 可见角色 | 关键操作 | 关键跳转 |');
  push('|---|---|---|---|---|---|---|---|');
  items.forEach(it => {
    const p = PAGES[it[0]];
    seq++;
    const acts = (p.actions || []).map(a => a[1]).slice(0, 4).join('、') || '—';
    const jumps = (p.jump || []).map(j => j[0]).slice(0, 3).join('、') || '—';
    push(`| ${seq} | ${it[0]} | #/${it[0]} | ${esc(p.title)} | ${typeName(p.type)} | ${esc(rolesText(p.roles))} | ${esc(acts)} | ${esc(jumps)} |`);
  });
  push('');
});
if (notInMenu.length) {
  push('### 4.x 未挂载页面', '', '| 页面 ID | 页面名称 |', '|---|---|');
  notInMenu.forEach(id => push(`| ${id} | ${esc(PAGES[id].title)} |`));
  push('');
}

push('## 五、关键业务链路与跳转逻辑', '');
push('| 链路 | 页面路径 | 说明 |', '|---|---|---|');
push('| 研发到量产 | 物料申请 → BOM 管理 → 工艺路线 → ECN 变更 → 图纸中心 → 工单管理 | 临时码转正式码，ECN 生效后同步 BOM/工艺/图纸至 ERP、MES |');
push('| 需求到计划 | 需求预测 → S&OP 会议 → 主生产计划 → 补货计划 / 产能平衡 | 共识预测驱动主生产与补货，产能瓶颈触发外协/加班 |');
push('| 采购到付款 | 采购申请 → 采购订单 → ASN 收货协同 → 三单匹配对账 → 发票与结算 | 订单、收货、发票三单匹配通过后进入应付 |');
push('| 生产执行 | 工单管理 → 报工管理 → 质量管理 → 批次追溯 → 安灯异常 | 报工与完工实时回写 ERP，异常安灯升级 |');
push('| 设备运维 | 设备管理 → 点检保养 → 故障报修 → 安灯异常 → 工单管理 | 点检逾期升级待办，故障停机计入 OEE 并联动维修备件领用 |');
push('| 成本核算 | 工单管理 → 报工管理 → 成本核算 → 应收应付 → 指标平台 | 材料按实际领用、人工按报工工时、制造费用按分摊率归集，差异回写总账 |');
push('| 外部门户协同 | 供应商门户 / 客户门户 → 采购订单 / 销售订单 → ASN / 发货单 → 三单匹配 / 发票结算 | 外部账号由 IAM 托管并绑定编码，门户只写协同单据，业务单据仍以 ERP 为归属 |');
push('| 仓储作业 | 收货与上架 → 库存管理 → 拣货与发货 → 盘点管理 | 库存以 WMS 实绩为准回写 ERP，盘点差异生成工单 |');
push('| 订单履约 | 订单池 → 订单审核与分单 → 发货单 → 运输任务 → 在途与签收 | 信用/价格/库存校验后分单，OMS→WMS→TMS 协同 |');
push('| 退货逆向 | 退换货 RMA → 收货与上架 → 质量管理 → 应收应付 | 退货入库回补库存，不良品隔离，应收联动冲减 |');
push('| 物流成本 | 承运商与运价 → 运输任务 → 在途与签收 → 运费对账 → 应收应付 | TMS 运费对账是物流成本与应付唯一入口 |');
push('| 数据治理 | 主数据管理 → 编码规则 → 数据质量与血缘 → 指标平台 → 自助报表 | 一物一码、一源一主、单向分发、订阅消费 |');
push('| 变更发布 | 流程中心 → CI/CD 与发布 → 监控与 SLO → 审计日志 | GitOps 触发、金丝雀发布、SLO 监控、全量留痕 |', '');

push('## 六、架构能力覆盖对照（附录 A）', '');
push(`承接方式定义：**专属** = 有独立功能页面；**借用** = 由其他页面或页签间接承接、无独立入口；**N/A** = 架构上无独立管理界面需求。当前专属 ${kindCount('专属')} 项、借用 ${kindCount('借用')} 项、N/A ${kindCount('N/A')} 项。`, '');
push('| # | 架构能力 | 承接方式 | 承接页面 | 覆盖 | 边界说明 |', '|---|---|---|---|---|---|');
CAPABILITIES.forEach((c, i) => {
  const pages = c[1].map(id => `${PAGES[id].title}（#/${id}）`);
  push(`| ${i + 1} | ${esc(c[0])} | ${esc(c[2] || '专属')} | ${esc(pages.join('、'))} | ${c[1].every(id => PAGES[id]) ? '已覆盖' : '缺失'} | ${esc(c[3] || '—')} |`);
});
push('');

push('## 七、字段与权限说明的呈现方式', '');
push('每个页面右上角提供 **“ⓘ 页面说明”** 抽屉，固定包含五段内容，满足“功能说明 + 字段定义 + 权限控制”要求：', '');
push('1. **页面功能说明**：路由、所属模块、页面类型、功能描述、关联架构能力；');
push('2. **字段定义说明**：字段名称、类型/规则（编码只读、枚举状态、数值千分位）、权限/来源（如“ERP 唯一写入”）；');
push('3. **操作权限控制**：页面可见角色、按钮级允许角色、RBAC + 数据范围模型说明；');
push('4. **跳转逻辑与数据流转**：关键跳转路由、审批流步骤、模块级数据流转规则（与架构方案的权威源约束一致）；');
push('5. **数据展示与操作规则**：分页、筛选、状态色板、高风险操作二次确认与审计留痕要求。', '');
push('以下为显式定义字段级规则的页面（其余页面由表格列自动生成字段说明）：', '');
fieldsPages.forEach(id => {
  const p = PAGES[id];
  push(`### ${p.title}（#/${id}）`, '');
  push('| 字段 | 类型 / 规则 | 权限 / 来源 |', '|---|---|---|');
  p.fields.forEach(f => push(`| ${esc(f[0])} | ${esc(f[1])} | ${esc(f[2])} |`));
  push('');
});

push('## 八、完整性校验结果', '');
push('| # | 校验项 | 结果 | 明细 |', '|---|---|---|---|');
checks.forEach((c, i) => push(`| ${i + 1} | ${c.name} | ${c.pass ? '通过' : '未通过'} | ${esc(c.detail)} |`));
push('');
push(`**总体结论：${allPass ? '全部校验通过，UI 页面与架构方案功能边界一致。' : '存在未通过项，请按明细修复后重新生成。'}**`, '');

push('## 九、目录结构与预览方式', '');
push('```text', 'docs/', '├─ 系统整合架构设计方案-V1.0.md        # 设计依据', '├─ UI页面清单与设计说明.md              # 本文档（脚本生成）', '└─ ui-demo/', '   ├─ index.html                        # 预览入口', '   ├─ assets/', '   │  ├─ styles.css                     # 统一视觉规范', `   │  ├─ data.js                        # ${pageIds.length} 个页面元数据 + ${ROLES.length} 角色 + ${CAPABILITIES.length} 能力映射`, '   │  └─ app.js                          # 路由 / 权限 / 渲染 / 抽屉 / 图表', '   └─ tools/', '      └─ gen-inventory.js               # 清单生成与完整性校验', '```', '');
push('预览方式（任选其一）：', '');
push('```bash', '# 方式一：直接双击 index.html（无外部依赖，file:// 可运行）', '', '# 方式二：本地静态服务（推荐，贴近真实部署）', 'cd docs/ui-demo', 'python -m http.server 8080', '# 浏览器访问 http://localhost:8080', '```', '');
push('演示说明：', '');
push(`- 默认以 **系统管理员** 视角登录，可查看全部 ${pageIds.length} 个页面；右上角可切换 ${ROLES.length} 类角色，导航与按钮权限实时重算。`);
push('- 登录页路由 `#/login`，所有数据为前端生成的演示样例，不调用后端、不写入真实数据。');
push('- 页面详情、新建/编辑、审批、异常示例、页面说明均以右侧抽屉呈现，关键跳转使用 hash 路由。', '');

const out = path.join(root, '..', 'UI页面清单与设计说明.md');
fs.writeFileSync(out, L.join('\n'), 'utf8');

console.log('checks:');
checks.forEach(c => console.log(`  [${c.pass ? 'PASS' : 'FAIL'}] ${c.name} - ${c.detail}`));
console.log(`\npages=${pageIds.length} menu=${menuIds.length} roles=${ROLES.length} caps=${CAPABILITIES.length}`);
console.log('written:', path.resolve(out));
process.exit(allPass ? 0 : 1);
