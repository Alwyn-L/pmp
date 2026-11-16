<template>
  <div class="pmp-page">
    <PageHeader :config="headerConfig" />

    <div class="pmp-card">
      <div class="pmp-filters" style="border-bottom: 1px solid var(--pmp-border)">
        <el-input v-model="query.keyword" placeholder="角色名称 / 编码" clearable style="width: 220px"
                  @keyup.enter="search" @clear="search" />
        <el-select v-model="query.status" placeholder="状态" clearable style="width: 130px" @change="search">
          <el-option label="启用" value="启用" />
          <el-option label="停用" value="停用" />
        </el-select>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>

      <div style="padding: 14px">
        <div class="pmp-toolbar" style="padding-bottom: 12px">
          <el-button type="primary" @click="openCreate"><el-icon><Plus /></el-icon><span>新增角色</span></el-button>
          <el-button circle :loading="loading" @click="load"><el-icon><Refresh /></el-icon></el-button>
        </div>

        <el-table v-loading="loading" :data="rows" border stripe>
          <el-table-column prop="code" label="角色编码" width="130" />
          <el-table-column prop="name" label="角色名称" width="150" />
          <el-table-column label="数据权限" width="140">
            <template #default="{ row }">
              <el-tag size="small" effect="plain">{{ scopeText(row.data_scope) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="user_count" label="关联用户" width="100" />
          <el-table-column prop="menu_count" label="菜单数" width="90" />
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-switch :model-value="row.status === '启用'" :disabled="row.code === 'admin'"
                         @change="(v: boolean) => toggleStatus(row, v)" />
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="说明" min-width="200" show-overflow-tooltip />
          <el-table-column label="操作" width="300" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
              <el-button link type="primary" @click="openPerm(row)">菜单权限</el-button>
              <el-button link type="primary" @click="openScope(row)">数据权限</el-button>
              <el-button link type="primary" @click="openUsers(row)">关联用户</el-button>
              <el-button link type="danger" :disabled="row.code === 'admin'" @click="onDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="display: flex; justify-content: flex-end; padding-top: 14px">
          <el-pagination v-model:current-page="query.page" v-model:page-size="query.size" :total="total"
                         :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next" background
                         @current-change="load" @size-change="load" />
        </div>
      </div>
    </div>

    <el-dialog v-model="dialog.visible" :title="dialog.id ? '编辑角色' : '新增角色'" width="560px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="96px">
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="form.code" placeholder="全局唯一，如 buyer" />
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="全局唯一，如 采购员" />
        </el-form-item>
        <el-form-item label="数据权限" prop="dataScope">
          <el-select v-model="form.dataScope" style="width: 100%">
            <el-option v-for="item in scopes" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio value="启用">启用</el-radio>
            <el-radio value="停用">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="说明"><el-input v-model="form.remark" type="textarea" :rows="2" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="submit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="perm.visible" :title="`菜单权限 · ${perm.role?.name || ''}`" width="520px" destroy-on-close>
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 10px"
                title="保存后立即生效：该角色下所有在线账号会被强制重新登录以刷新权限。" />
      <el-tree ref="menuTreeRef" :data="menuTree" node-key="id" show-checkbox default-expand-all
               :props="{ label: 'name', children: 'children' }" />
      <template #footer>
        <el-button @click="perm.visible = false">取消</el-button>
        <el-button type="primary" :loading="perm.saving" @click="savePerm">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="scope.visible" :title="`数据权限 · ${scope.role?.name || ''}`" width="520px" destroy-on-close>
      <el-form label-width="96px">
        <el-form-item label="权限范围">
          <el-select v-model="scope.scope" style="width: 100%">
            <el-option v-for="item in scopes" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="scope.scope === 'CUSTOM'" label="指定部门">
          <el-select v-model="scope.deptIds" multiple style="width: 100%">
            <el-option v-for="d in depts" :key="d.id" :label="d.name" :value="d.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="scope.visible = false">取消</el-button>
        <el-button type="primary" :loading="scope.saving" @click="saveScope">保存</el-button>
      </template>
    </el-dialog>

    <el-drawer v-model="users.visible" :title="`关联用户 · ${users.role?.name || ''}`" size="520px">
      <el-table :data="users.rows" border size="small">
        <el-table-column prop="username" label="账号" width="140" />
        <el-table-column prop="nickname" label="姓名" />
        <el-table-column prop="status" label="状态" width="90" />
        <el-table-column label="操作" width="90">
          <template #default="{ row }">
            <el-button link type="danger" @click="unbind(row)">解绑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import PageHeader from '@/components/PageHeader.vue'
import * as api from '@/api/system'

const headerConfig = {
  id: 'system-role', type: 'system', title: '角色管理',
  desc: '角色的新增、编辑、删除与启停，配置菜单权限、数据权限范围，并查看/解绑关联用户，保存后权限即时生效。',
  jump: [{ label: '用户管理', id: 'system-user' }, { label: '菜单管理', id: 'system-menu' }],
  actions: [{ key: 'create', label: '新增角色' }, { key: 'assign', label: '菜单权限' }, { key: 'scope', label: '数据权限' }, { key: 'users', label: '关联用户' }, { key: 'delete', label: '删除' }],
  fields: [['角色编码', '全局唯一', '管理员'], ['角色名称', '全局唯一', '管理员'], ['数据权限', 'ALL / 本部门 / 本部门及下级 / 仅本人 / 自定义', '管理员']]
}

const scopes = [
  { value: 'ALL', label: '全部数据' },
  { value: 'DEPT', label: '本部门' },
  { value: 'DEPT_AND_CHILD', label: '本部门及下级' },
  { value: 'SELF', label: '仅本人' },
  { value: 'CUSTOM', label: '自定义部门' }
]

const loading = ref(false)
const rows = ref<any[]>([])
const total = ref(0)
const query = reactive<any>({ page: 1, size: 10, keyword: '', status: undefined })
const dialog = reactive<{ visible: boolean; id?: number }>({ visible: false })
const submitting = ref(false)
const formRef = ref<FormInstance>()
const form = reactive<any>({ code: '', name: '', dataScope: 'DEPT', status: '启用', remark: '' })
const rules: FormRules = {
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
}

const menuTree = ref<any[]>([])
const menuTreeRef = ref<any>()
const perm = reactive<{ visible: boolean; role: any; saving: boolean }>({ visible: false, role: null, saving: false })
const scope = reactive<{ visible: boolean; role: any; scope: string; deptIds: number[]; saving: boolean }>({ visible: false, role: null, scope: 'DEPT', deptIds: [], saving: false })
const users = reactive<{ visible: boolean; role: any; rows: any[] }>({ visible: false, role: null, rows: [] })
const depts = ref<any[]>([])

function scopeText(value: string) {
  return scopes.find((s) => s.value === value)?.label || value || '-'
}

async function load() {
  loading.value = true
  try {
    const data = await api.listRoles(query)
    rows.value = data.records || []
    total.value = data.total || 0
  } finally {
    loading.value = false
  }
}

function search() { query.page = 1; load() }
function reset() { Object.assign(query, { page: 1, keyword: '', status: undefined }); load() }

function openCreate() {
  Object.assign(form, { code: '', name: '', dataScope: 'DEPT', status: '启用', remark: '' })
  dialog.id = undefined
  dialog.visible = true
}

function openEdit(row: any) {
  Object.assign(form, { code: row.code, name: row.name, dataScope: row.data_scope, status: row.status, remark: row.remark })
  dialog.id = row.id
  dialog.visible = true
}

async function submit() {
  if (submitting.value) return
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  submitting.value = true
  try {
    if (dialog.id) {
      await api.updateRole(dialog.id, form)
      ElMessage.success('角色已更新')
    } else {
      await api.createRole(form)
      ElMessage.success('角色已创建')
    }
    dialog.visible = false
    await load()
  } finally {
    submitting.value = false
  }
}

async function toggleStatus(row: any, enabled: boolean) {
  await api.changeRoleStatus(row.id, enabled ? '启用' : '停用')
  ElMessage.success('状态已更新，关联会话已刷新')
  await load()
}

async function onDelete(row: any) {
  await ElMessageBox.confirm(`确认删除角色「${row.name}」？`, '删除确认', { type: 'warning' })
  await api.deleteRole(row.id)
  ElMessage.success('角色已删除')
  await load()
}

async function openPerm(row: any) {
  perm.role = row
  if (!menuTree.value.length) menuTree.value = await api.menuTree()
  const checked = await api.roleMenus(row.id)
  perm.visible = true
  await nextTick()
  menuTreeRef.value?.setCheckedKeys(checked, false)
}

async function savePerm() {
  if (perm.saving) return
  perm.saving = true
  try {
    const keys = [...menuTreeRef.value.getCheckedKeys(), ...menuTreeRef.value.getHalfCheckedKeys()]
    await api.bindRoleMenus(perm.role.id, keys)
    ElMessage.success('菜单权限已保存，关联账号已强制重新登录')
    perm.visible = false
    await load()
  } finally {
    perm.saving = false
  }
}

async function openScope(row: any) {
  scope.role = row
  scope.scope = row.data_scope || 'DEPT'
  scope.deptIds = []
  if (!depts.value.length) {
    const tree = await api.deptTree()
    const flat: any[] = []
    const walk = (list: any[]) => list.forEach((d) => { flat.push(d); walk(d.children || []) })
    walk(tree)
    depts.value = flat
  }
  scope.visible = true
}

async function saveScope() {
  if (scope.saving) return
  scope.saving = true
  try {
    await api.changeRoleScope(scope.role.id, { dataScope: scope.scope, deptIds: scope.deptIds })
    ElMessage.success('数据权限已保存')
    scope.visible = false
    await load()
  } finally {
    scope.saving = false
  }
}

async function openUsers(row: any) {
  users.role = row
  const data = await api.roleUsers(row.id, { page: 1, size: 100 })
  users.rows = data.records || []
  users.visible = true
}

async function unbind(row: any) {
  await ElMessageBox.confirm(`确认将用户「${row.username}」从角色「${users.role.name}」解绑？`, '解绑确认', { type: 'warning' })
  await api.unbindRoleUser(users.role.id, row.id)
  ElMessage.success('已解绑')
  await openUsers(users.role)
  await load()
}

onMounted(load)
</script>
