<template>
  <div class="pmp-page">
    <PageHeader :config="headerConfig" />

    <div class="pmp-card" style="padding: 14px">
      <div class="pmp-toolbar" style="padding-bottom: 12px">
        <div style="display: flex; gap: 8px">
          <el-button type="primary" @click="openCreate(null)"><el-icon><Plus /></el-icon><span>新增根菜单</span></el-button>
          <el-button circle :loading="loading" @click="load"><el-icon><Refresh /></el-icon></el-button>
        </div>
        <span class="pmp-sub">支持拖拽调整层级与顺序，松开后自动保存；上级可放目录，页面菜单需绑定已存在组件。</span>
      </div>

      <el-tree
        v-loading="loading"
        :data="tree"
        node-key="id"
        draggable
        default-expand-all
        :expand-on-click-node="false"
        :allow-drop="allowDrop"
        :props="{ label: 'name', children: 'children' }"
        @node-drop="onDrop"
      >
        <template #default="{ data }">
          <div class="node">
            <el-icon><component :is="data.icon || 'Menu'" /></el-icon>
            <span class="name">{{ data.name }}</span>
            <el-tag size="small" effect="plain" :type="typeTag(data.type)">{{ typeText(data.type) }}</el-tag>
            <span class="path mono">{{ data.path || '-' }}</span>
            <span v-if="data.visible === 0" class="pmp-sub">（隐藏）</span>
            <span v-if="data.external === 1" class="pmp-sub">（外链）</span>
            <span class="ops">
              <el-button link type="primary" @click.stop="openCreate(data)">新增子项</el-button>
              <el-button link type="primary" @click.stop="openEdit(data)">编辑</el-button>
              <el-button link type="danger" @click.stop="onDelete(data)">删除</el-button>
            </span>
          </div>
        </template>
      </el-tree>
    </div>

    <el-dialog v-model="dialog.visible" :title="dialog.id ? '编辑菜单' : '新增菜单'" width="660px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="上级菜单">
              <el-tree-select v-model="form.parentId" :data="parentOptions" check-strictly :render-after-expand="false"
                              node-key="id" :props="{ label: 'name', children: 'children' }" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="name"><el-input v-model="form.name" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="form.type" style="width: 100%">
                <el-option label="目录" value="DIR" />
                <el-option label="页面菜单" value="MENU" />
                <el-option label="按钮" value="BUTTON" />
                <el-option label="外链" value="LINK" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="form.path" placeholder="如 /purchase-order 或 https://..." />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="绑定组件" prop="component">
              <el-select v-model="form.component" filterable clearable style="width: 100%" placeholder="选择页面组件">
                <el-option v-for="p in pageOptions" :key="p.id" :label="`${p.title}（${p.id}）`" :value="p.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标">
              <el-input v-model="form.icon" placeholder="Element Plus 图标名，如 ShoppingCart">
                <template #prepend><el-icon><component :is="form.icon || 'Menu'" /></el-icon></template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限标识"><el-input v-model="form.permCode" placeholder="如 biz:purchase-order:list" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序"><el-input-number v-model="form.sort" :min="0" :max="999" style="width: 100%" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示"><el-switch v-model="form.visibleBool" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外部链接"><el-switch v-model="form.externalBool" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio value="启用">启用</el-radio>
                <el-radio value="停用">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="submit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import PageHeader from '@/components/PageHeader.vue'
import * as api from '@/api/system'
import pagesMeta from '@/meta/pages.json'

const headerConfig = {
  id: 'system-menu', type: 'system', title: '菜单管理',
  desc: '树形菜单与按钮权限维护，支持新增、编辑、删除、拖拽排序、图标、路由与组件合法性校验、隐藏与外链菜单。',
  jump: [{ label: '角色管理', id: 'system-role' }, { label: '用户管理', id: 'system-user' }],
  actions: [{ key: 'create', label: '新增菜单' }, { key: 'update', label: '编辑/拖拽排序' }, { key: 'delete', label: '删除' }],
  fields: [['路由地址', '小写字母/数字/中划线，以 / 开头；外链必须 http(s)://', '管理员'], ['绑定组件', '必须是已存在的页面组件 ID', '管理员'], ['隐藏/外链', '隐藏菜单不渲染，外链菜单新窗口打开', '管理员']]
}

const SYSTEM_PAGES = [
  { id: 'system-user', title: '用户管理' }, { id: 'system-role', title: '角色管理' },
  { id: 'system-menu', title: '菜单管理' }, { id: 'system-dept', title: '部门管理' },
  { id: 'system-log', title: '登录与操作日志' }
]
const pageOptions = [...SYSTEM_PAGES, ...(pagesMeta as any[]).map((p) => ({ id: p.id, title: p.title }))]

const loading = ref(false)
const tree = ref<any[]>([])
const dialog = reactive<{ visible: boolean; id?: number }>({ visible: false })
const submitting = ref(false)
const formRef = ref<FormInstance>()
const form = reactive<any>({
  parentId: 0, name: '', type: 'MENU', path: '', component: '', icon: '', permCode: '',
  sort: 0, visibleBool: true, externalBool: false, status: '启用'
})
const rules: FormRules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }]
}

const parentOptions = computed(() => [{ id: 0, name: '根目录', children: tree.value }])

function typeText(type: string) {
  return ({ DIR: '目录', MENU: '页面', BUTTON: '按钮', LINK: '外链' } as any)[type] || type
}
function typeTag(type: string) {
  return ({ DIR: 'info', MENU: 'primary', BUTTON: 'warning', LINK: 'success' } as any)[type] || 'info'
}

async function load() {
  loading.value = true
  try {
    tree.value = await api.menuTree()
  } finally {
    loading.value = false
  }
}

function openCreate(parent: any) {
  Object.assign(form, {
    parentId: parent?.id || 0, name: '', type: parent ? 'MENU' : 'DIR', path: '', component: '',
    icon: '', permCode: '', sort: 0, visibleBool: true, externalBool: false, status: '启用'
  })
  dialog.id = undefined
  dialog.visible = true
}

function openEdit(row: any) {
  Object.assign(form, {
    parentId: row.parent_id, name: row.name, type: row.type, path: row.path || '',
    component: row.component || '', icon: row.icon || '', permCode: row.perm_code || '',
    sort: row.sort || 0, visibleBool: row.visible === 1, externalBool: row.external === 1,
    status: row.status || '启用'
  })
  dialog.id = row.id
  dialog.visible = true
}

async function submit() {
  if (submitting.value) return
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  submitting.value = true
  try {
    const payload = {
      parentId: form.parentId || 0,
      name: form.name,
      type: form.type,
      path: form.path || null,
      component: form.component || null,
      icon: form.icon || null,
      permCode: form.permCode || null,
      sort: form.sort || 0,
      visible: form.visibleBool ? 1 : 0,
      external: form.externalBool ? 1 : 0,
      status: form.status
    }
    if (dialog.id) {
      await api.updateMenu(dialog.id, payload)
      ElMessage.success('菜单已更新')
    } else {
      await api.createMenu(payload)
      ElMessage.success('菜单已创建')
    }
    dialog.visible = false
    await load()
  } finally {
    submitting.value = false
  }
}

async function onDelete(row: any) {
  await ElMessageBox.confirm(`确认删除菜单「${row.name}」？已授权关系会同步清理。`, '删除确认', { type: 'warning' })
  await api.deleteMenu(row.id)
  ElMessage.success('菜单已删除')
  await load()
}

function allowDrop(_dragging: any, drop: any, type: string) {
  return type !== 'inner' || drop.data.type === 'DIR'
}

async function onDrop() {
  const items: any[] = []
  const walk = (nodes: any[], parentId: number) => {
    nodes.forEach((node, index) => {
      items.push({ id: node.id, parentId, sort: index + 1 })
      if (node.children?.length) walk(node.children, node.id)
    })
  }
  walk(tree.value, 0)
  await api.sortMenus(items)
  ElMessage.success('排序已保存')
  await load()
}

onMounted(load)
</script>

<style scoped>
.node { display: flex; align-items: center; gap: 8px; flex: 1; padding: 3px 0; font-size: 13px; }
.node .name { font-weight: 500; }
.node .path { color: var(--pmp-muted); font-size: 12px; }
.node .ops { margin-left: auto; display: none; }
.node:hover .ops { display: inline-flex; }
</style>
