<template>
  <div class="pmp-page">
    <PageHeader :config="headerConfig" />

    <div class="pmp-card">
      <div class="pmp-filters" style="border-bottom: 1px solid var(--pmp-border)">
        <el-input v-model="query.keyword" placeholder="账号 / 姓名 / 手机号" clearable style="width: 220px"
                  @keyup.enter="search" @clear="search" />
        <el-select v-model="query.deptId" placeholder="所属部门" clearable style="width: 170px" @change="search">
          <el-option v-for="d in depts" :key="d.id" :label="d.name" :value="d.id" />
        </el-select>
        <el-select v-model="query.roleId" placeholder="角色" clearable style="width: 160px" @change="search">
          <el-option v-for="r in roles" :key="r.id" :label="r.name" :value="r.id" />
        </el-select>
        <el-select v-model="query.status" placeholder="状态" clearable style="width: 130px" @change="search">
          <el-option label="启用" value="启用" />
          <el-option label="停用" value="停用" />
        </el-select>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>

      <div style="padding: 14px">
        <div class="pmp-toolbar" style="padding-bottom: 12px">
          <el-button type="primary" @click="openCreate">
            <el-icon><Plus /></el-icon><span>新增用户</span>
          </el-button>
          <el-button circle :loading="loading" @click="load"><el-icon><Refresh /></el-icon></el-button>
        </div>

        <el-table v-loading="loading" :data="rows" border stripe>
          <el-table-column prop="username" label="账号" width="140" />
          <el-table-column prop="nickname" label="姓名" width="120" />
          <el-table-column prop="dept_name" label="部门" width="130" />
          <el-table-column prop="role_names" label="角色" min-width="160" show-overflow-tooltip />
          <el-table-column prop="phone" label="手机号" width="130" />
          <el-table-column label="状态" width="110">
            <template #default="{ row }">
              <el-switch :model-value="row.status === '启用'" :disabled="row.username === 'admin'"
                         @change="(v: boolean) => toggleStatus(row, v)" />
            </template>
          </el-table-column>
          <el-table-column prop="last_login_at" label="最近登录" width="170">
            <template #default="{ row }">{{ formatTime(row.last_login_at) }}</template>
          </el-table-column>
          <el-table-column prop="last_login_ip" label="登录 IP" width="130" />
          <el-table-column label="操作" width="250" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
              <el-button link type="primary" @click="onReset(row)">重置密码</el-button>
              <el-button link type="warning" @click="onKick(row)">强制下线</el-button>
              <el-button link type="danger" :disabled="row.username === 'admin'" @click="onDelete(row)">删除</el-button>
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

    <el-dialog v-model="dialog.visible" :title="dialog.id ? '编辑用户' : '新增用户'" width="620px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="账号" prop="username">
              <el-input v-model="form.username" :disabled="!!dialog.id" placeholder="登录账号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="nickname"><el-input v-model="form.nickname" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="deptId">
              <el-select v-model="form.deptId" clearable style="width: 100%">
                <el-option v-for="d in depts" :key="d.id" :label="d.name" :value="d.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" style="width: 100%">
                <el-option label="启用" value="启用" />
                <el-option label="停用" value="停用" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号"><el-input v-model="form.phone" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱"><el-input v-model="form.email" /></el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色" prop="roleIds">
              <el-select v-model="form.roleIds" multiple style="width: 100%" placeholder="请选择角色">
                <el-option v-for="r in roles" :key="r.id" :label="`${r.name}（${r.code}）`" :value="r.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="!dialog.id" :span="24">
            <el-form-item label="初始密码">
              <el-input v-model="form.password" placeholder="留空则使用 Demo@123" show-password />
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
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import PageHeader from '@/components/PageHeader.vue'
import * as api from '@/api/system'

const headerConfig = {
  id: 'system-user', type: 'system', title: '用户管理',
  desc: '维护平台账号、所属部门与角色绑定，支持启停、重置密码、强制下线与按角色/部门筛选。',
  jump: [{ label: '角色管理', id: 'system-role' }, { label: '部门管理', id: 'system-dept' }, { label: '登录与操作日志', id: 'system-log' }],
  actions: [{ key: 'create', label: '新增用户' }, { key: 'update', label: '编辑/启停' }, { key: 'reset', label: '重置密码' }, { key: 'kick', label: '强制下线' }, { key: 'delete', label: '删除' }],
  fields: [['账号', '全局唯一，创建后不可修改', '管理员'], ['角色', '多选，决定可见菜单与按钮权限', '管理员'], ['状态', '停用后立即踢下线并禁止登录', '管理员']]
}

const loading = ref(false)
const rows = ref<any[]>([])
const total = ref(0)
const depts = ref<any[]>([])
const roles = ref<any[]>([])
const query = reactive<any>({ page: 1, size: 10, keyword: '', deptId: undefined, roleId: undefined, status: undefined })
const dialog = reactive<{ visible: boolean; id?: number }>({ visible: false })
const submitting = ref(false)
const formRef = ref<FormInstance>()
const form = reactive<any>({ username: '', nickname: '', deptId: undefined, phone: '', email: '', status: '启用', password: '', roleIds: [] })
const rules: FormRules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  roleIds: [{ required: true, type: 'array', min: 1, message: '至少选择一个角色', trigger: 'change' }]
}

async function load() {
  loading.value = true
  try {
    const data = await api.listUsers(query)
    rows.value = data.records || []
    total.value = data.total || 0
  } finally {
    loading.value = false
  }
}

async function loadOptions() {
  const data = await api.userOptions()
  depts.value = data.depts || []
  roles.value = data.roles || []
}

function search() {
  query.page = 1
  load()
}

function reset() {
  Object.assign(query, { page: 1, keyword: '', deptId: undefined, roleId: undefined, status: undefined })
  load()
}

function formatTime(value: string) {
  return value ? String(value).replace('T', ' ').slice(0, 19) : '-'
}

function openCreate() {
  Object.assign(form, { username: '', nickname: '', deptId: undefined, phone: '', email: '', status: '启用', password: '', roleIds: [] })
  dialog.id = undefined
  dialog.visible = true
}

async function openEdit(row: any) {
  const roleIds = await api.userRoles(row.id)
  Object.assign(form, {
    username: row.username,
    nickname: row.nickname,
    deptId: row.dept_id,
    phone: row.phone,
    email: row.email,
    status: row.status,
    password: '',
    roleIds
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
    if (dialog.id) {
      await api.updateUser(dialog.id, form)
      ElMessage.success('用户已更新，权限即时生效')
    } else {
      await api.createUser(form)
      ElMessage.success('用户已创建')
    }
    dialog.visible = false
    await load()
  } finally {
    submitting.value = false
  }
}

async function toggleStatus(row: any, enabled: boolean) {
  await api.changeUserStatus(row.id, enabled ? '启用' : '停用')
  ElMessage.success(enabled ? '已启用' : '已停用并踢出会话')
  await load()
}

async function onReset(row: any) {
  const { value } = await ElMessageBox.prompt(`为「${row.username}」设置新密码（至少 6 位）`, '重置密码', {
    inputType: 'password',
    inputPattern: /.{6,}/,
    inputErrorMessage: '密码至少 6 位'
  })
  await api.resetPassword(row.id, value)
  ElMessage.success('密码已重置，该账号需重新登录')
}

async function onKick(row: any) {
  await ElMessageBox.confirm(`确认强制下线「${row.username}」？`, '强制下线', { type: 'warning' })
  await api.kickUser(row.id)
  ElMessage.success('已踢出该账号全部会话')
}

async function onDelete(row: any) {
  await ElMessageBox.confirm(`确认删除用户「${row.username}」？`, '删除确认', { type: 'warning' })
  await api.deleteUser(row.id)
  ElMessage.success('已删除')
  await load()
}

onMounted(async () => {
  await loadOptions()
  await load()
})
</script>
