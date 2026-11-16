<template>
  <div class="profile">
    <PageHeader :config="headerConfig" />
    <el-card shadow="never">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="账号">{{ profile?.username || '-' }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ profile?.nickname || '-' }}</el-descriptions-item>
        <el-descriptions-item label="所属部门">{{ profile?.dept_name || profile?.deptName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="数据权限">{{ scopeText }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ profile?.phone || '-' }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ profile?.email || '-' }}</el-descriptions-item>
        <el-descriptions-item label="角色" :span="2">
          <el-tag v-for="role in profile?.roles || []" :key="role" size="small" class="tag">{{ role }}</el-tag>
          <span v-if="!(profile?.roles || []).length">-</span>
        </el-descriptions-item>
      </el-descriptions>
      <div class="actions">
        <el-button type="danger" plain @click="signOut">退出登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import PageHeader from '@/components/PageHeader.vue'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

const router = useRouter()
const user = useUserStore()
const permission = usePermissionStore()
const profile = computed(() => user.profile)

const headerConfig = {
  id: 'profile',
  type: 'panel',
  title: '个人中心',
  desc: '查看当前登录账号的身份、角色与数据权限范围；修改密码与角色分配请前往系统管理。',
  fields: [
    ['账号', '登录唯一标识', '只读'],
    ['姓名', '展示名称', '只读'],
    ['角色', '由管理员分配', '只读'],
    ['数据权限', '所有角色合并后的最宽范围', '只读']
  ],
  jump: [{ id: 'system-user', label: '用户管理' }]
}

const scopeText = computed(() => ({
  ALL: '全部数据',
  DEPT: '本部门',
  DEPT_AND_CHILD: '本部门及下级',
  SELF: '仅本人',
  CUSTOM: '自定义'
} as Record<string, string>)[user.dataScope] || user.dataScope || '-')

async function signOut() {
  await ElMessageBox.confirm('确认退出当前账号？', '退出登录', { type: 'warning' })
  await user.signOut()
  permission.reset()
  ElMessage.success('已安全退出')
  router.push('/login')
}
</script>

<style scoped>
.profile { padding: 16px 20px; }
.tag { margin-right: 6px; }
.actions { margin-top: 16px; display: flex; justify-content: flex-end; }
</style>
