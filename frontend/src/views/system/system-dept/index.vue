<template>
  <div class="pmp-page">
    <PageHeader :config="headerConfig" />

    <div class="pmp-card" style="padding: 14px">
      <div class="pmp-toolbar" style="padding-bottom: 12px">
        <el-button type="primary" @click="openCreate(null)"><el-icon><Plus /></el-icon><span>新增根部门</span></el-button>
        <el-button circle :loading="loading" @click="load"><el-icon><Refresh /></el-icon></el-button>
      </div>

      <el-table v-loading="loading" :data="tree" row-key="id" border default-expand-all
                :tree-props="{ children: 'children' }">
        <el-table-column prop="name" label="部门名称" min-width="220" />
        <el-table-column prop="ancestors" label="层级路径" width="160" />
        <el-table-column prop="sort" label="排序" width="90" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column label="操作" width="220">
          <template #default="{ row }">
            <el-button link type="primary" @click="openCreate(row)">新增子部门</el-button>
            <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="onDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialog.visible" :title="dialog.id ? '编辑部门' : '新增部门'" width="480px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="上级部门">
          <el-tree-select v-model="form.parentId" :data="parentOptions" check-strictly node-key="id"
                          :props="{ label: 'name', children: 'children' }" style="width: 100%" />
        </el-form-item>
        <el-form-item label="部门名称" prop="name"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort" :min="0" :max="999" /></el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio value="启用">启用</el-radio>
            <el-radio value="停用">停用</el-radio>
          </el-radio-group>
        </el-form-item>
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

const headerConfig = {
  id: 'system-dept', type: 'system', title: '部门管理',
  desc: '组织部门树维护，ancestors 层级路径用于数据权限「本部门及下级」过滤。',
  jump: [{ label: '用户管理', id: 'system-user' }, { label: '角色管理', id: 'system-role' }],
  actions: [{ key: 'create', label: '新增部门' }, { key: 'update', label: '编辑' }, { key: 'delete', label: '删除' }],
  fields: [['部门名称', '必填，同级不重名', '管理员'], ['上级部门', '决定层级与数据权限范围', '管理员']]
}

const loading = ref(false)
const tree = ref<any[]>([])
const dialog = reactive<{ visible: boolean; id?: number }>({ visible: false })
const submitting = ref(false)
const formRef = ref<FormInstance>()
const form = reactive<any>({ parentId: 0, name: '', sort: 0, status: '启用' })
const rules: FormRules = { name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }] }
const parentOptions = computed(() => [{ id: 0, name: '根目录', children: tree.value }])

async function load() {
  loading.value = true
  try {
    tree.value = await api.deptTree()
  } finally {
    loading.value = false
  }
}

function openCreate(parent: any) {
  Object.assign(form, { parentId: parent?.id || 0, name: '', sort: 0, status: '启用' })
  dialog.id = undefined
  dialog.visible = true
}

function openEdit(row: any) {
  Object.assign(form, { parentId: row.parent_id, name: row.name, sort: row.sort, status: row.status })
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
      await api.updateDept(dialog.id, form)
      ElMessage.success('部门已更新')
    } else {
      await api.createDept(form)
      ElMessage.success('部门已创建')
    }
    dialog.visible = false
    await load()
  } finally {
    submitting.value = false
  }
}

async function onDelete(row: any) {
  await ElMessageBox.confirm(`确认删除部门「${row.name}」？`, '删除确认', { type: 'warning' })
  await api.deleteDept(row.id)
  ElMessage.success('部门已删除')
  await load()
}

onMounted(load)
</script>
