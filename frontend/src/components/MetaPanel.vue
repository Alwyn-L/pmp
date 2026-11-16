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

    <div v-if="config.flow" class="pmp-card block">
      <h3>流程状态</h3>
      <el-steps :active="config.flow.current || 0" finish-status="success" align-center>
        <el-step v-for="step in config.flow.steps" :key="step" :title="step" />
      </el-steps>
    </div>

    <div v-if="config.charts?.length" class="chart-grid">
      <div v-for="(chart, index) in config.charts" :key="index" class="pmp-card block">
        <h3>{{ chart.title }} <span class="pmp-sub">{{ chart.sub }}</span></h3>
        <div v-if="chart.type === 'donut'" class="donut">
          <div v-for="item in chart.items" :key="item[0]" class="donut-row">
            <span class="label">{{ item[0] }}</span>
            <div class="bar"><i :style="{ width: item[1] + '%', background: item[2] }" /></div>
            <span class="value">{{ item[1] }}%</span>
          </div>
        </div>
        <div v-else :ref="(el) => setChartRef(el, index)" class="chart" />
      </div>
    </div>

    <div class="grid-2">
      <div v-if="config.todos?.length" class="pmp-card block">
        <h3>待办事项</h3>
        <div v-for="(item, i) in config.todos" :key="i" class="line-item">
          <span class="dot" :class="item[3]" />
          <span class="text">{{ item[0] }}</span>
          <el-tag size="small" effect="plain">{{ item[1] }}</el-tag>
          <span class="time">{{ item[2] }}</span>
        </div>
      </div>
      <div v-if="config.notices?.length" class="pmp-card block">
        <h3>公告与通知</h3>
        <div v-for="(item, i) in config.notices" :key="i" class="line-item">
          <el-icon><Bell /></el-icon>
          <span class="text">{{ item[0] }}</span>
          <span class="time">{{ item[1] }}</span>
        </div>
      </div>
    </div>

    <div v-if="config.quicks?.length" class="pmp-card block">
      <h3>快捷入口</h3>
      <div class="quicks">
        <div v-for="item in config.quicks" :key="item[1]" class="quick" @click="go(item[1])">
          <span class="quick-icon">{{ item[2] }}</span>
          <span>{{ item[0] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import PageHeader from '@/components/PageHeader.vue'

const props = defineProps<{ config: any }>()
const config = props.config
const router = useRouter()
const charts: any[] = []
let instances: echarts.ECharts[] = []

function setChartRef(el: any, index: number) {
  if (el) charts[index] = el
}

function go(id: string) {
  router.push(`/${id}`)
}

function renderCharts() {
  instances.forEach((item) => item.dispose())
  instances = []
  ;(config.charts || []).forEach((chart: any, index: number) => {
    if (chart.type === 'donut' || !charts[index]) return
    const instance = echarts.init(charts[index])
    instance.setOption({
      tooltip: { trigger: 'axis' },
      legend: { top: 0, textStyle: { fontSize: 11 } },
      grid: { left: 36, right: 16, top: 32, bottom: 26 },
      xAxis: { type: 'category', data: chart.labels, axisLabel: { fontSize: 10 } },
      yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
      series: chart.series.map((s: any) => ({
        name: s[0],
        type: chart.type,
        smooth: true,
        data: s[1],
        itemStyle: { color: s[2] },
        areaStyle: chart.type === 'line' ? { opacity: 0.08 } : undefined
      }))
    })
    instances.push(instance)
  })
}

function onResize() {
  instances.forEach((item) => item.resize())
}

onMounted(async () => {
  await nextTick()
  renderCharts()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  instances.forEach((item) => item.dispose())
})
</script>

<style scoped>
.block { padding: 16px 18px; margin-bottom: 14px; }
h3 { margin: 0 0 12px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
.chart-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 14px; }
.chart { height: 220px; }
.donut-row { display: flex; align-items: center; gap: 10px; margin: 10px 0; font-size: 12px; }
.donut-row .label { width: 90px; color: var(--pmp-muted); }
.donut-row .bar { flex: 1; height: 8px; border-radius: 4px; background: #eef2f7; overflow: hidden; }
.donut-row .bar i { display: block; height: 100%; border-radius: 4px; }
.donut-row .value { width: 42px; text-align: right; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 14px; }
.line-item { display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px dashed var(--pmp-border); font-size: 13px; }
.line-item:last-child { border-bottom: none; }
.line-item .text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.line-item .time { color: var(--pmp-muted); font-size: 12px; }
.line-item .dot { width: 8px; height: 8px; border-radius: 50%; background: #94a3b8; }
.line-item .dot.warning { background: #f59e0b; }
.line-item .dot.danger { background: #ef4444; }
.line-item .dot.info { background: #3b82f6; }
.line-item .dot.success { background: #10b981; }
.quicks { display: flex; flex-wrap: wrap; gap: 10px; }
.quick { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid var(--pmp-border); border-radius: 8px; cursor: pointer; font-size: 13px; }
.quick:hover { border-color: var(--pmp-primary); color: var(--pmp-primary); }
.quick-icon { font-size: 15px; }
</style>
