/**
 * 由 frontend/src/meta/pages.json 生成 70 个页面薄壳：
 *   views/{slug}/{id}/index.vue + config.ts
 * list 页面渲染通用 CrudPage，其余渲染 MetaPanel。
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pages = JSON.parse(readFileSync(resolve(root, 'src/meta/pages.json'), 'utf8'))
const viewsRoot = resolve(root, 'src/views')

const crudVue = `<template>
  <CrudPage :config="config" />
</template>

<script setup lang="ts">
import CrudPage from '@/components/crud/CrudPage.vue'
import config from './config'
</script>
`

const panelVue = `<template>
  <MetaPanel :config="config" />
</template>

<script setup lang="ts">
import MetaPanel from '@/components/MetaPanel.vue'
import config from './config'
</script>
`

const keep = new Set(['login', 'error'])
let generated = 0

for (const page of pages) {
  const dir = resolve(viewsRoot, page.slug, page.id)
  mkdirSync(dir, { recursive: true })
  const { id, mod, slug, type, title, desc, roles, jump, ...rest } = page
  const config = { id, mod, slug, type, title, desc, roles, jump, ...rest }
  writeFileSync(resolve(dir, 'config.ts'),
    `/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */\nexport default ${JSON.stringify(config, null, 2)} as any\n`,
    'utf8')
  writeFileSync(resolve(dir, 'index.vue'), type === 'list' ? crudVue : panelVue, 'utf8')
  generated += 1
}

console.log(`generated ${generated} pages`)
