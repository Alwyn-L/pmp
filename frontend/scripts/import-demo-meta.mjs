/**
 * 从 docs/ui-demo/assets/data.js 抽取页面/菜单/角色元数据，产出：
 *   frontend/src/meta/{pages,menu,roles}.json
 *   deploy/backend/src/main/resources/biz/catalog.json
 *   deploy/backend/src/main/resources/db/migration/V2__rbac_seed.sql
 *   deploy/backend/src/main/resources/db/migration/V3__biz_tables.sql
 * data.js 为唯一事实来源，生成后冻结，禁止手工修改生成物。
 */
import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const { ROLES, MENU, PAGES } = require(resolve(root, 'docs/ui-demo/assets/data.js'))

const SLUG = {
  工作台: 'workbench', 研发协同: 'rd', 计划: 'plan', 采购: 'purchase', 生产: 'prod',
  仓储: 'wms', 履约: 'oms', 物流: 'tms', 客户: 'crm', 财务协同: 'fin',
  数据: 'data', 公共能力: 'platform', 运维管控: 'ops', 系统管理: 'system', 帮助与异常: 'common'
}

const ICON = {
  工作台: 'OfficeBuilding', 研发协同: 'Cpu', 计划: 'Calendar', 采购: 'ShoppingCart',
  生产: 'SetUp', 仓储: 'Box', 履约: 'Document', 物流: 'Van', 客户: 'User',
  财务协同: 'Money', 数据: 'DataAnalysis', 公共能力: 'Grid', 运维管控: 'Monitor',
  系统管理: 'Setting', 帮助与异常: 'QuestionFilled'
}

/** 新增的管理页面（数据权限、角色、菜单）不属于 data.js，单独补充 */
const SYSTEM_PAGES = [
  { id: 'system-user', mod: '系统管理', title: '用户管理', desc: '维护平台账号、所属部门与角色绑定，支持启停、重置密码、强制下线与按角色/部门筛选。', roles: ['admin', 'audit'] },
  { id: 'system-role', mod: '系统管理', title: '角色管理', desc: '角色的新增、编辑、删除与启停，配置菜单权限、数据权限范围，并查看/解绑关联用户。', roles: ['admin'] },
  { id: 'system-menu', mod: '系统管理', title: '菜单管理', desc: '树形菜单与按钮权限维护，支持新增、编辑、删除、拖拽排序、图标、路由与组件合法性校验、隐藏与外链菜单。', roles: ['admin'] },
  { id: 'system-dept', mod: '系统管理', title: '部门管理', desc: '组织部门树维护，支撑数据权限按部门/部门及下级过滤。', roles: ['admin'] },
  { id: 'system-log', mod: '系统管理', title: '登录与操作日志', desc: '登录成功/失败/锁定/踢出记录与关键操作审计，支持按时间、账号、结果筛选。', roles: ['admin', 'audit'] }
]

const snake = (s) => String(s).replace(/[A-Z]/g, (m) => '_' + m.toLowerCase()).replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '').toLowerCase()

const RESERVED = new Set(['id', 'code', 'created_by', 'created_at', 'updated_by', 'updated_at', 'deleted', 'version', 'dept_id'])
const colKey = (raw) => {
  const k = snake(raw)
  if (k === 'code') return 'code'
  return RESERVED.has(k) ? 'x_' + k : k
}

const normalizeCols = (cols = []) => cols.map((c) => {
  const [key, label, width, kind, options] = c
  return {
    key: colKey(key),
    label,
    width: width || 120,
    kind: kind === 'tag' ? 'tag' : kind === 'mono' ? 'mono' : 'text',
    ...(options ? { options } : {})
  }
})

const takeFilters = (filters = [], columns = []) => filters.map((f) => {
  if (typeof f === 'string') {
    if (f.includes('时间')) return { type: 'dateRange', label: '时间范围' }
    const hit = columns.find((c) => c.label === f)
    return { type: 'text', label: f, ...(hit ? { key: hit.key } : { key: 'keyword' }) }
  }
  const hit = columns.find((c) => c.label === f.l)
  return { type: 'select', label: f.l, options: f.o, ...(hit ? { key: hit.key } : {}) }
})

const uniqueCols = (list) => {
  const map = new Map()
  list.forEach((c) => { if (!map.has(c.key)) map.set(c.key, c) })
  return [...map.values()]
}

const formsOf = (cols, fields) => cols.map((c, i) => {
  const base = { key: c.key, label: c.label }
  let f
  if (c.kind === 'tag' && c.options) f = { ...base, type: 'select', options: Object.keys(c.options), required: i < 3 }
  else if (['time', 'updated', 'created', 'updated_at', 'created_at'].includes(c.key)) f = { ...base, type: 'input', required: false }
  else if (c.key === 'code') f = { ...base, type: 'input', required: false, placeholder: '留空自动生成' }
  else if (c.label.includes('描述') || c.label.includes('备注') || c.label.includes('内容')) f = { ...base, type: 'textarea', required: false }
  else f = { ...base, type: 'input', required: i < 3 }
  const meta = (fields || []).find((x) => x[0] === f.label)
  return meta ? { ...f, tip: meta[1], rule: meta[2] } : f
})

const pages = []
const catalog = []

for (const p of Object.values(PAGES)) {
  const slug = SLUG[p.mod] || 'common'
  const tabs = (p.tabs || []).map((t) => ({ name: t.name, columns: normalizeCols(t.cols) }))
  const columns = uniqueCols(tabs.length ? tabs.flatMap((t) => t.columns) : normalizeCols(p.cols))
  const filters = takeFilters(p.filters, columns)

  const page = {
    id: p.id,
    mod: p.mod,
    slug,
    type: p.type,
    title: p.title,
    desc: p.desc,
    roles: p.roles,
    jump: (p.jump || []).map(([label, id]) => ({ label, id })),
    ...(p.kpis ? { kpis: p.kpis.map(([label, value, sub, tone]) => ({ label, value, sub, tone })) } : {}),
    ...(p.flow ? { flow: p.flow } : {}),
    ...(p.charts ? { charts: p.charts } : {}),
    ...(p.todos ? { todos: p.todos } : {}),
    ...(p.notices ? { notices: p.notices } : {}),
    ...(p.quicks ? { quicks: p.quicks } : {}),
    ...(columns.length ? { columns, tabs, filters } : {}),
    ...(columns.length ? { formFields: formsOf(columns, p.fields) } : {}),
    ...(p.actions ? { actions: p.actions.map(([key, label, perm]) => ({ key, label, perm })) } : {}),
    ...(p.rowActions ? { rowActions: p.rowActions.map(([key, label, perm]) => ({ key, label, perm })) } : {}),
    ...(p.fields ? { fields: p.fields } : {})
  }
  pages.push(page)

  if (p.type === 'list') {
    catalog.push({
      pageId: p.id,
      table: 'biz_' + p.id.replace(/-/g, '_'),
      module: p.mod,
      title: p.title,
      columns: columns.map((c) => ({ key: c.key, label: c.label, type: c.kind })),
      searchColumns: columns.filter((c) => c.kind !== 'tag').slice(0, 4).map((c) => c.key)
    })
  }
}

const menu = MENU.map((g, gi) => ({
  id: 'g-' + gi,
  name: g.g,
  icon: ICON[g.g] || 'Menu',
  sort: gi + 1,
  items: g.items.map(([id, name], ii) => {
    const page = PAGES[id] || {}
    return { id, name, badge: g.items[ii][2] || '', sort: ii + 1, roles: page.roles || [] }
  })
}))

const roles = ROLES.map((r) => ({
  ...r,
  dataScope: r.id === 'admin' || ['exec', 'audit', 'data'].includes(r.id) ? 'ALL'
    : ['supplier', 'customer'].includes(r.id) ? 'SELF' : 'DEPT'
}))

const out = (rel, data) => {
  const file = resolve(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, typeof data === 'string' ? data : JSON.stringify(data, null, 2), 'utf8')
  console.log('write', rel)
}

out('frontend/src/meta/pages.json', pages)
out('frontend/src/meta/menu.json', menu)
out('frontend/src/meta/roles.json', roles)
out('deploy/backend/src/main/resources/biz/catalog.json', { generatedAt: '2026-11-12', pages: catalog })

/* ----------------------------- 业务表 DDL ----------------------------- */
const q = (s) => '"' + s.replace(/"/g, '""') + '"'
const ddl = [
  '-- 由 frontend/scripts/import-demo-meta.mjs 生成，请勿手工修改',
  '-- 59 张业务表：公共字段 + 页面列定义（业务列统一 VARCHAR 以保留原始展示格式）'
]
for (const c of catalog) {
  ddl.push('', `CREATE TABLE IF NOT EXISTS app.${c.table} (`)
  const cols = [
    '  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY',
    '  code VARCHAR(64)',
    '  dept_id BIGINT',
    '  created_by VARCHAR(64)',
    '  created_at TIMESTAMPTZ DEFAULT now()',
    '  updated_by VARCHAR(64)',
    '  updated_at TIMESTAMPTZ DEFAULT now()',
    '  deleted SMALLINT NOT NULL DEFAULT 0',
    '  version INT NOT NULL DEFAULT 0'
  ]
  const seen = new Set()
  for (const col of c.columns) {
    if (seen.has(col.key) || RESERVED.has(col.key)) continue
    seen.add(col.key)
    cols.push(`  ${q(col.key)} VARCHAR(255)`)
  }
  ddl.push(cols.join(',\n') + '\n);')
  ddl.push(`CREATE INDEX IF NOT EXISTS idx_${c.table}_deleted ON app.${c.table}(deleted);`)
  ddl.push(`CREATE INDEX IF NOT EXISTS idx_${c.table}_created ON app.${c.table}(created_at DESC);`)
}
out('deploy/backend/src/main/resources/db/migration/V3__biz_tables.sql', ddl.join('\n') + '\n')


/* ----------------------------- RBAC 种子数据 ----------------------------- */
const sqlStr = (s) => "'" + String(s).replace(/'/g, "''") + "'"
const seed = []
seed.push('-- 由 frontend/scripts/import-demo-meta.mjs 生成，请勿手工修改')
seed.push('-- 17 角色 / 15 菜单分组 / 70 业务菜单 + 5 系统管理菜单 / 页面资源')

seed.push('\n-- 部门')
seed.push(`INSERT INTO app.sys_dept(id,parent_id,ancestors,name,sort,status) VALUES
 (1,0,'0','PMP 集团',1,'启用'),
 (2,1,'0,1','研发中心',1,'启用'),
 (3,1,'0,1','供应链中心',2,'启用'),
 (4,1,'0,1','制造中心',3,'启用'),
 (5,1,'0,1','财务中心',4,'启用')
 ON CONFLICT (id) DO NOTHING;`)

seed.push('\n-- 角色')
seed.push('INSERT INTO app.sys_role(id,code,name,data_scope,status,remark) VALUES')
seed.push(roles.map((r, i) => ` (${i + 1},${sqlStr(r.id)},${sqlStr(r.name)},${sqlStr(r.dataScope)},'启用',${sqlStr(r.desc)})`).join(',\n') + '\n ON CONFLICT (code) DO NOTHING;')

seed.push('\n-- 菜单：分组')
const groupRows = menu.map((g, i) => ` (${100 + i},0,${sqlStr(g.name)},'DIR',NULL,NULL,${sqlStr(g.icon)},NULL,${g.sort},1,0,'启用')`)
seed.push('INSERT INTO app.sys_menu(id,parent_id,name,type,path,component,icon,perm_code,sort,visible,external,status) VALUES')
seed.push(groupRows.join(',\n') + '\n ON CONFLICT (id) DO NOTHING;')

seed.push('\n-- 菜单：页面')
const menuRows = []
const pageMenuId = new Map()
let mid = 1000
menu.forEach((g, gi) => {
  g.items.forEach((it) => {
    mid += 1
    pageMenuId.set(it.id, mid)
    menuRows.push(` (${mid},${100 + gi},${sqlStr(it.name)},'MENU','/${it.id}',${sqlStr(it.id)},NULL,${sqlStr('biz:' + it.id + ':list')},${it.sort},1,0,'启用')`)
  })
})
SYSTEM_PAGES.forEach((p, i) => {
  mid += 1
  pageMenuId.set(p.id, mid)
  menuRows.push(` (${mid},113,${sqlStr(p.title)},'MENU','/${p.id}',${sqlStr(p.id)},NULL,${sqlStr('system:' + p.id + ':list')},${10 + i},1,0,'启用')`)
})
seed.push('INSERT INTO app.sys_menu(id,parent_id,name,type,path,component,icon,perm_code,sort,visible,external,status) VALUES')
seed.push(menuRows.join(',\n') + '\n ON CONFLICT (id) DO NOTHING;')

seed.push('\n-- 角色-菜单：按页面 roles 声明授权，admin 全量')
const rm = []
roles.forEach((r, ri) => {
  const roleId = ri + 1
  const ids = new Set()
  if (r.id === 'admin') {
    pageMenuId.forEach((v) => ids.add(v))
  } else {
    for (const [pid, id] of pageMenuId) {
      const page = pages.find((p) => p.id === pid) || SYSTEM_PAGES.find((p) => p.id === pid)
      if (!page) continue
      if (page.roles.includes('') || page.roles.includes(r.id)) ids.add(id)
    }
  }
  for (const id of ids) rm.push(` (${roleId},${id})`)
})
seed.push('INSERT INTO app.sys_role_menu(role_id,menu_id) VALUES')
seed.push(rm.join(',\n') + '\n ON CONFLICT DO NOTHING;')

seed.push('\n-- 页面资源（业务接口白名单与权限前缀）')
seed.push('INSERT INTO app.sys_page_resource(page_id,table_name,module,title,api_prefix,perm_prefix) VALUES')
seed.push(catalog.map((c) => ` (${sqlStr(c.pageId)},${sqlStr(c.table)},${sqlStr(c.module)},${sqlStr(c.title)},${sqlStr('/api/v1/biz/' + c.pageId)},${sqlStr('biz:' + c.pageId)})`).join(',\n') + '\n ON CONFLICT (page_id) DO NOTHING;')

seed.push('\n-- 字典')
seed.push(`INSERT INTO app.sys_dict_type(code,name,status) VALUES
 ('material_type','物料类型','启用'),('order_status','订单状态','启用'),('yes_no','是否','启用')
 ON CONFLICT (code) DO NOTHING;
INSERT INTO app.sys_dict_item(type_code,label,value,sort,status) VALUES
 ('material_type','原材料','RAW',1,'启用'),('material_type','半成品','SEMI',2,'启用'),('material_type','成品','FIN',3,'启用'),
 ('order_status','草稿','DRAFT',1,'启用'),('order_status','待审批','PENDING',2,'启用'),('order_status','已完成','DONE',3,'启用'),
 ('yes_no','是','Y',1,'启用'),('yes_no','否','N',2,'启用')
 ON CONFLICT DO NOTHING;`)

out('deploy/backend/src/main/resources/db/migration/V2__rbac_seed.sql', seed.join('\n') + '\n')

/* ----------------------------- 业务表演示数据（每表 5 行） ----------------------------- */
const seedRows = []
for (const p of Object.values(PAGES)) {
  if (p.type !== 'list') continue
  const entry = catalog.find((c) => c.pageId === p.id)
  if (!entry) continue
  const sampler = typeof p.sample === 'function' ? p.sample : p.tabs?.[0]?.sample
  if (typeof sampler !== 'function') continue
  const rawToKey = new Map()
  const collect = (cols) => cols.forEach(([k]) => rawToKey.set(k, colKey(k)))
  if (p.cols) collect(p.cols)
  ;(p.tabs || []).forEach((t) => collect(t.cols))
  const initials = p.id.split('-').filter(Boolean).map((s) => s[0].toUpperCase()).join('')
  for (let i = 1; i <= 5; i++) {
    let sample
    try {
      sample = sampler(i)
    } catch {
      continue
    }
    if (!sample) continue
    const fill = (value) => String(value)
      .replaceAll('{nn}', String(i).padStart(2, '0'))
      .replaceAll('{n}', String(i))
    const row = {}
    for (const [raw, value] of Object.entries(sample)) {
      const key = rawToKey.get(raw)
      if (!key || RESERVED.has(key)) continue
      if (value === undefined || value === null || String(value) === '') continue
      row[key] = fill(value)
    }
    const colNames = Object.keys(row)
    const code = fill(sample.code || `${initials}-2026-${String(i).padStart(4, '0')}`)
    const values = [sqlStr(code), '1', sqlStr('demo'), ...colNames.map((k) => sqlStr(row[k])),
      `now() - interval '${i} days'`]
    const insertCols = ['code', 'dept_id', 'created_by', ...colNames.map(q), 'created_at'].join(', ')
    seedRows.push(`insert into app.${entry.table}(${insertCols}) values (${values.join(', ')});`)
  }
}
out('deploy/backend/src/main/resources/db/migration/V4__biz_seed.sql',
  '-- 由 frontend/scripts/import-demo-meta.mjs 生成，请勿手工修改\n-- 59 张业务表演示数据（每表 5 行）\n'
  + seedRows.join('\n') + '\n')

console.log(`pages=${pages.length} catalog=${catalog.length} roles=${roles.length} menus=${menu.reduce((a, g) => a + g.items.length, 0)}`)
