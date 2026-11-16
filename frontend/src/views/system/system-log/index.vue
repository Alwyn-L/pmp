<template>
  <div class="pmp-page">
    <PageHeader :config="headerConfig" />

    <div class="pmp-card" style="padding: 14px">
      <el-tabs v-model="activeTab" @tab-change="load">
        <el-tab-pane label="登录日志" name="login" />
        <el-tab-pane label="操作日志" name="oper" />
      </el-tabs>

      <div class="pmp-toolbar" style="padding: 4px 0 12px">
        <div style="display: flex; gap: 8px">
          <el-input v-model="query.keyword" :placeholder="activeTab === 'login' ? '账号' : '账号 / 模块 / 接口'"
                    clearable style="width: 220px" @keyup.enter="search" @clear="search" />
          <el-select v-if="activeTab === 'login'" v-model="query.result" placeholder="结果" clearable
                     style="width: 140px" @change="search">
            <el-option label="成功" value="SUCCESS" />
            <el-option label="失败" value="FAIL" />
            <el-option label="锁定" value="LOCKED" />
          </el-select>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
        <el-button circle :loading="loading" @click="load"><el-icon><Refresh /></el-icon></el-button>
      </div>

      <el-table v-loading="loading" :data="rows" border stripe>
        <template v-if="activeTab === 'login'">
          <el-table-column prop="username" label="账号" width="140" />
          <el-table-column prop="result" label="结果" width="100">
            <template #default="{ row }">
              <el-tag size="small" :type="row.result === 'SUCCESS' ? 'success' : row.result === 'LOCKED' ? 'warning' : 'danger'">
                {{ row.result }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="msg" label="说明" min-width="200" />
          <el-table-column prop="ip" label="IP" width="140" />
          <el-table-column prop="ua" label="User-Agent" min-width="220" show-overflow-tooltip />
          <el-table-column prop="created_at" label="时间" width="180" :formatter="timeFormat" />
        </template>
        <template v-else>
          <el-table-column prop="username" label="账号" width="130" />
          <el-table-column prop="module" label="模块" width="120" />
          <el-table-column prop="action" label="动作" width="100" />
          <el-table-column prop="uri" label="接口" min-width="220" show-overflow-tooltip />
          <el-table-column prop="ip" label="IP" width="130" />
          <el-table-column prop="cost_ms" label="耗时(ms)" width="100" />
          <el-table-column prop="result" label="结果" width="90" />
          <el-table-column prop="created_at" label="时间" width="180" :formatter="timeFormat" />
        </template>
      </el-table>

      <div style="display: flex; justify-content: flex-end; padding-top: 14px">
        <el-pagination v-model:current-page="query.page" v-model:page-size="query.size" :total="total"
                       :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next" background
                       @current-change="load" @size-change="load" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import * as api from '@/api/system'

const headerConfig = {
  id: 'system-log', type: 'system', title: '登录与操作日志',
  desc: '登录成功/失败/锁定/踢出记录与关键操作审计，支持按账号、结果筛选。',
  jump: [{ label: '用户管理', id: 'system-user' }, { label: '审计日志', id: 'audit' }],
  actions: [{ key: 'query', label: '条件查询' }, { key: 'export', label: '导出（业务页支持）' }],
  fields: [['结果', 'SUCCESS / FAIL / LOCKED / KICKED', '系统写入'], ['时间', '按服务器时区 Asia/Shanghai', '系统写入']]
}

const activeTab = ref<'login' | 'oper'>('login')
const loading = ref(false)
const rows = ref<any[]>([])
const total = ref(0)
const query = reactive<any>({ page: 1, size: 10, keyword: '', result: undefined })

function timeFormat(_row: any, _col: any, value: string) {
  return value ? String(value).replace('T', ' ').slice(0, 19) : '-'
}

async function load() {
  loading.value = true
  try {
    const params = { page: query.page, size: query.size, keyword: query.keyword, result: query.result }
    const data = activeTab.value === 'login'
      ? await api.loginLogs({ page: query.page, size: query.size, username: query.keyword, result: query.result })
      : await api.operLogs(params)
    rows.value = data.records || []
    total.value = data.total || 0
  } finally {
    loading.value = false
  }
}

function search() { query.page = 1; load() }
function reset() { Object.assign(query, { page: 1, keyword: '', result: undefined }); load() }

onMounted(load)
</script>
