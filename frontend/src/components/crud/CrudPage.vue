<template>
  <div class="pmp-page">
    <PageHeader :config="config" />

    <div v-if="config.kpis?.length" class="pmp-kpi-grid" style="margin-bottom: 14px">
      <div v-for="kpi in config.kpis" :key="kpi.label" class="pmp-kpi">
        <div class="kpi-label">{{ kpi.label }}</div>
        <div class="kpi-value">{{ kpi.value }}</div>
        <div class="kpi-sub">{{ kpi.sub }}</div>
      </div>
    </div>

    <div class="pmp-card">
      <div class="pmp-filters" style="border-bottom: 1px solid var(--pmp-border)">
        <template v-for="(filter, index) in config.filters || []" :key="index">
          <el-date-picker
            v-if="filter.type === 'dateRange'"
            v-model="filterValues[index]"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 260px"
            @change="search"
          />
          <el-select
            v-else-if="filter.type === 'select'"
            v-model="filterValues[index]"
            :placeholder="filter.label"
            clearable
            style="width: 160px"
            @change="search"
          >
            <el-option v-for="opt in filter.options" :key="opt" :label="opt" :value="opt" />
          </el-select>
          <el-input
            v-else
            v-model="filterValues[index]"
            :placeholder="filter.label"
            clearable
            style="width: 190px"
            @keyup.enter="search"
            @clear="search"
          />
        </template>
        <el-button type="primary" @click="search">
          <el-icon><Search /></el-icon><span>查询</span>
        </el-button>
        <el-button @click="reset">重置</el-button>
      </div>

      <div class="table-area">
        <el-tabs v-if="config.tabs?.length" v-model="activeTab" class="tabs" @tab-change="onTabChange">
          <el-tab-pane v-for="(tab, i) in config.tabs" :key="tab.name" :label="tab.name" :name="String(i)" />
        </el-tabs>

        <div class="pmp-toolbar" style="padding: 4px 4px 12px">
          <div class="left">
            <el-button type="primary" :disabled="!user.hasPerm(`${perm}:create`)" @click="openCreate">
              <el-icon><Plus /></el-icon><span>新增</span>
            </el-button>
            <el-button type="danger" plain :disabled="!selection.length || !user.hasPerm(`${perm}:delete`)"
                       @click="onBatchDelete">
              批量删除{{ selection.length ? `（${selection.length}）` : '' }}
            </el-button>
            <el-button plain :disabled="!user.hasPerm(`${perm}:export`)" @click="onExport">
              <el-icon><Download /></el-icon><span>导出</span>
            </el-button>
          </div>
          <div class="right">
            <el-tooltip content="刷新列表" placement="top">
              <el-button circle :loading="loading" @click="load">
                <el-icon><Refresh /></el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </div>

        <el-table v-loading="loading" :data="rows" border stripe row-key="id" @selection-change="onSelection">
          <el-table-column type="selection" width="46" fixed />
          <el-table-column
            v-for="col in columns"
            :key="col.key"
            :prop="col.key"
            :label="col.label"
            :width="col.width || 120"
            :min-width="col.width || 120"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="col.kind === 'tag' && row[col.key]" size="small"
                      :type="tagType(col.options?.[row[col.key]])" effect="light">
                {{ row[col.key] }}
              </el-tag>
              <span v-else-if="col.kind === 'mono'" class="mono">{{ display(row[col.key]) }}</span>
              <span v-else>{{ display(row[col.key]) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="196" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="openDetail(row)">详情</el-button>
              <el-button link type="primary" :disabled="!user.hasPerm(`${perm}:update`)"
                         @click="openEdit(row)">编辑</el-button>
              <el-button link type="danger" :disabled="!user.hasPerm(`${perm}:delete`)"
                         @click="onDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pager">
          <el-pagination
            v-model:current-page="page"
            v-model:page-size="size"
            :total="total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            background
            @current-change="load"
            @size-change="onSizeChange"
          />
        </div>
      </div>
    </div>

    <el-dialog v-model="dialog.visible" :title="dialog.mode === 'create' ? `新增${config.title}` : `编辑${config.title}`"
               width="660px" destroy-on-close append-to-body>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="118px">
        <el-row :gutter="12">
          <el-col v-for="field in config.formFields || []" :key="field.key" :span="12">
            <el-form-item :label="field.label" :prop="field.key">
              <el-select v-if="field.type === 'select'" v-model="form[field.key]" clearable style="width: 100%"
                         :placeholder="`请选择${field.label}`">
                <el-option v-for="opt in field.options" :key="opt" :label="opt" :value="opt" />
              </el-select>
              <el-input v-else-if="field.type === 'textarea'" v-model="form[field.key]" type="textarea" :rows="2"
                        :placeholder="field.placeholder || field.tip || `请输入${field.label}`" />
              <el-input v-else v-model="form[field.key]" clearable
                        :placeholder="field.placeholder || field.tip || `请输入${field.label}`" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="submit">确定</el-button>
      </template>
    </el-dialog>

    <el-drawer v-model="detail.visible" :title="`${config.title}详情`" size="480px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">{{ detail.row?.id }}</el-descriptions-item>
        <el-descriptions-item v-for="col in config.columns || []" :key="col.key" :label="col.label">
          {{ display(detail.row?.[col.key]) }}
        </el-descriptions-item>
        <el-descriptions-item label="创建人">{{ display(detail.row?.created_by) }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ display(detail.row?.created_at) }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ display(detail.row?.updated_at) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import PageHeader from '@/components/PageHeader.vue'
import { useUserStore } from '@/stores/user'
import * as crud from '@/api/crud'

const props = defineProps<{ config: any }>()
const config = props.config
const user = useUserStore()
const perm = `biz:${config.id}`

const loading = ref(false)
const rows = ref<any[]>([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
const selection = ref<any[]>([])
const activeTab = ref('0')
const filterValues = reactive<any[]>([])

const columns = computed(() => {
  if (config.tabs?.length) {
    const tab = config.tabs[Number(activeTab.value)]
    return tab?.columns || []
  }
  return config.columns || []
})

const formRef = ref<FormInstance>()
const submitting = ref(false)
const dialog = reactive<{ visible: boolean; mode: 'create' | 'edit'; id?: number }>({ visible: false, mode: 'create' })
const form = reactive<any>({})
const detail = reactive<{ visible: boolean; row: any }>({ visible: false, row: null })

const rules = computed<FormRules>(() => {
  const result: FormRules = {}
  for (const field of config.formFields || []) {
    if (field.required) {
      result[field.key] = [{ required: true, message: `请填写${field.label}`, trigger: 'blur' }]
    }
  }
  return result
})

function display(value: any) {
  return value === null || value === undefined || value === '' ? '-' : value
}

function tagType(tone?: string) {
  const map: Record<string, string> = { success: 'success', warning: 'warning', danger: 'danger', info: 'info', muted: 'info' }
  return (map[tone || ''] || 'info') as any
}

function buildQuery(withPage = true) {
  const query: any = {}
  if (withPage) {
    query.page = page.value
    query.size = size.value
  }
  ;(config.filters || []).forEach((filter: any, index: number) => {
    const value = filterValues[index]
    if (!value || (Array.isArray(value) && !value.length)) return
    if (filter.type === 'dateRange') {
      query.dateFrom = value[0]
      query.dateTo = value[1]
    } else if (filter.key === 'keyword') {
      query.keyword = value
    } else if (filter.key) {
      query[`f_${filter.key}`] = Array.isArray(value) ? String(value) : value
    }
  })
  return query
}

async function load() {
  loading.value = true
  try {
    const result = await crud.fetchList(config.id, buildQuery())
    rows.value = result.records || []
    total.value = result.total || 0
  } finally {
    loading.value = false
  }
}

function search() {
  page.value = 1
  load()
}

function reset() {
  ;(config.filters || []).forEach((_: any, index: number) => { filterValues[index] = undefined })
  page.value = 1
  load()
}

function onSizeChange() {
  page.value = 1
  load()
}

function onTabChange() {
  page.value = 1
  load()
}

function onSelection(value: any[]) {
  selection.value = value
}

function openCreate() {
  dialog.mode = 'create'
  dialog.id = undefined
  Object.keys(form).forEach((key) => delete form[key])
  for (const field of config.formFields || []) {
    form[field.key] = ''
  }
  dialog.visible = true
}

async function openEdit(row: any) {
  dialog.mode = 'edit'
  dialog.id = row.id
  Object.keys(form).forEach((key) => delete form[key])
  const data = await crud.fetchDetail(config.id, row.id)
  Object.assign(form, data)
  dialog.visible = true
}

async function openDetail(row: any) {
  detail.row = await crud.fetchDetail(config.id, row.id)
  detail.visible = true
}

async function submit() {
  if (submitting.value) return
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  submitting.value = true
  try {
    const payload: any = {}
    for (const field of config.formFields || []) {
      const value = form[field.key]
      if (value !== '' && value !== undefined) payload[field.key] = value
    }
    if (dialog.mode === 'create') {
      await crud.createRecord(config.id, payload)
      ElMessage.success('新增成功')
    } else {
      payload.version = form.version
      await crud.updateRecord(config.id, dialog.id!, payload)
      ElMessage.success('修改成功')
    }
    dialog.visible = false
    await load()
  } finally {
    submitting.value = false
  }
}

async function onDelete(row: any) {
  const label = row.code || row.id
  await ElMessageBox.confirm(`确认删除「${label}」？删除后可在数据库层面追溯。`, '删除确认', {
    type: 'warning', confirmButtonText: '确认删除', cancelButtonText: '取消'
  })
  await crud.removeRecord(config.id, row.id)
  ElMessage.success('删除成功')
  if (rows.value.length === 1 && page.value > 1) page.value -= 1
  await load()
}

async function onBatchDelete() {
  await ElMessageBox.confirm(`确认批量删除选中的 ${selection.value.length} 条数据？`, '批量删除', {
    type: 'warning', confirmButtonText: '确认删除', cancelButtonText: '取消'
  })
  const result = await crud.batchRemove(config.id, selection.value.map((row) => row.id))
  ElMessage.success(`已删除 ${result.deleted ?? selection.value.length} 条`)
  selection.value = []
  await load()
}

async function onExport() {
  const response = await crud.exportCsv(config.id, buildQuery(false))
  const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${config.title}-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  ElMessage.success('导出完成')
}

onMounted(() => {
  ;(config.filters || []).forEach((_: any, index: number) => { filterValues[index] = undefined })
  load()
})
</script>

<style scoped>
.table-area { padding: 12px 14px 16px; }
.tabs { margin: 2px 0 6px; padding: 0 4px; }
.pager { display: flex; justify-content: flex-end; padding-top: 14px; }
.pmp-toolbar .left { display: flex; gap: 8px; }
</style>
