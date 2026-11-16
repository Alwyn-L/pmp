<template>
  <div class="page-header">
    <div class="left">
      <div class="pmp-title">{{ config.title }}</div>
      <div class="pmp-sub">{{ config.desc }}</div>
    </div>
    <div class="right">
      <slot />
      <el-button plain @click="open = true">
        <el-icon><InfoFilled /></el-icon>
        <span>页面说明</span>
      </el-button>
    </div>

    <el-drawer v-model="open" title="页面说明" size="460px">
      <div class="drawer-body">
        <h4>功能说明</h4>
        <p class="pmp-sub">{{ config.desc }}</p>

        <h4>核心字段</h4>
        <el-table :data="fieldRows" size="small" border>
          <el-table-column prop="label" label="字段" width="120" />
          <el-table-column prop="rule" label="规则" />
        </el-table>

        <h4>按钮与权限</h4>
        <div class="chips">
          <el-tag v-for="btn in config.actions || []" :key="btn.key" size="small" effect="plain">
            {{ btn.label }}
          </el-tag>
          <el-tag v-for="btn in config.rowActions || []" :key="btn.key" size="small" type="info" effect="plain">
            {{ btn.label }}
          </el-tag>
        </div>
        <p class="pmp-sub">权限码前缀：<code>{{ permPrefix }}</code>，后端按 list/create/update/delete/export 逐项校验。</p>

        <h4>跳转关系</h4>
        <div class="chips">
          <el-link v-for="j in config.jump || []" :key="j.id" type="primary" :underline="false"
                   @click="go(j.id)">
            {{ j.label }} →
          </el-link>
          <span v-if="!config.jump?.length" class="pmp-sub">无</span>
        </div>

        <h4>跨模块数据流转</h4>
        <p class="pmp-sub">
          {{ config.id }} 的数据变更会写入操作日志；主数据、BOM、工单、库存等下游视图通过页面跳转关系联动，
          角色与数据权限由系统管理统一控制，权限变更后相关账号会话立即失效并需重新登录。
        </p>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ config: any }>()
const open = ref(false)
const router = useRouter()
const permPrefix = computed(() => (props.config.type === 'list' ? `biz:${props.config.id}` : `page:${props.config.id}`))
const fieldRows = computed(() => {
  const fields = props.config.fields
  if (fields?.length) {
    return fields.map((f: string[]) => ({ label: f[0], rule: `${f[1]}（${f[2]}）` }))
  }
  return (props.config.formFields || []).slice(0, 8).map((f: any) => ({
    label: f.label,
    rule: f.tip || (f.required ? '必填' : '选填')
  }))
})

function go(id: string) {
  router.push(`/${id}`)
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 14px; }
.page-header .left { max-width: 820px; }
.page-header .right { display: flex; gap: 8px; flex-shrink: 0; }
h4 { margin: 20px 0 8px; font-size: 14px; }
h4:first-child { margin-top: 0; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
code { background: #f1f5f9; padding: 1px 6px; border-radius: 4px; font-size: 12px; }
</style>
