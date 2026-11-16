/**
 * 元数据一致性校验：页面/菜单/角色/组件/后端表目录必须一一对应。
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const pages = JSON.parse(readFileSync(resolve(root, 'frontend/src/meta/pages.json'), 'utf8'))
const menu = JSON.parse(readFileSync(resolve(root, 'frontend/src/meta/menu.json'), 'utf8'))
const roles = JSON.parse(readFileSync(resolve(root, 'frontend/src/meta/roles.json'), 'utf8'))
const catalog = JSON.parse(readFileSync(resolve(root, 'deploy/backend/src/main/resources/biz/catalog.json'), 'utf8'))

const errors = []
const ids = new Set()
for (const page of pages) {
  if (ids.has(page.id)) errors.push(`页面 ID 重复: ${page.id}`)
  ids.add(page.id)
  const file = resolve(root, `frontend/src/views/${page.slug}/${page.id}/index.vue`)
  if (!existsSync(file)) errors.push(`缺少页面组件: ${page.id}`)
  for (const role of page.roles || []) {
    if (role !== '' && !roles.some((r) => r.id === role)) {
      errors.push(`页面 ${page.id} 引用了不存在的角色: ${role}`)
    }
  }
}

const menuIds = menu.flatMap((g) => g.items.map((i) => i.id))
for (const id of menuIds) {
  if (!ids.has(id)) errors.push(`菜单引用了不存在的页面: ${id}`)
}

const listPages = pages.filter((p) => p.type === 'list')
if (listPages.length !== 59) errors.push(`列表页数量应为 59，实际 ${listPages.length}`)
if (catalog.pages.length !== 59) errors.push(`后端业务表数量应为 59，实际 ${catalog.pages.length}`)
const catalogIds = new Set(catalog.pages.map((p) => p.pageId))
for (const page of listPages) {
  if (!catalogIds.has(page.id)) errors.push(`后端缺少业务表: ${page.id}`)
}
for (const id of catalogIds) {
  if (!listPages.some((p) => p.id === id)) errors.push(`后端存在未定义业务表: ${id}`)
}

if (errors.length) {
  console.error(`元数据校验失败（${errors.length} 项）:`)
  errors.forEach((e) => console.error(' - ' + e))
  process.exit(1)
}
console.log(`元数据校验通过：${pages.length} 页面 / ${listPages.length} 列表页 / ${roles.length} 角色 / ${menuIds.length} 菜单 / ${catalog.pages.length} 业务表`)
