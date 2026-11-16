<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand" @click="router.push('/')">
        <div class="logo">P</div>
        <div class="brand-text">
          <strong>PMP 制造协同</strong>
          <span>Manufacturing Platform</span>
        </div>
      </div>
      <el-scrollbar class="menu-scroll">
        <el-menu
          :default-active="route.path"
          :collapse-transition="false"
          background-color="#0b1220"
          text-color="#cbd5e1"
          active-text-color="#ffffff"
          router
          unique-opened
        >
          <template v-for="group in visibleMenus" :key="group.id">
            <el-sub-menu v-if="group.type === 'DIR' && group.children?.length" :index="`g-${group.id}`">
              <template #title>
                <el-icon><component :is="group.icon || 'Menu'" /></el-icon>
                <span>{{ group.name }}</span>
              </template>
              <el-menu-item
                v-for="item in group.children"
                :key="item.id"
                :index="item.path"
                @click="onMenuClick(item)"
              >
                <el-icon><component :is="item.icon || 'Document'" /></el-icon>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else-if="group.type === 'MENU'" :index="group.path" @click="onMenuClick(group)">
              <el-icon><component :is="group.icon || 'Document'" /></el-icon>
              <span>{{ group.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </aside>

    <div class="main">
      <header class="topbar">
        <div class="crumb">
          <span class="root">PMP</span>
          <el-icon><ArrowRight /></el-icon>
          <span>{{ route.meta.title || '工作台' }}</span>
        </div>
        <div class="right">
          <el-tag size="small" effect="plain" type="info">数据权限：{{ scopeText }}</el-tag>
          <el-dropdown trigger="click" @command="onCommand">
            <span class="user">
              <el-avatar :size="28">{{ user.displayName.slice(0, 1) }}</el-avatar>
              <span class="name">{{ user.displayName }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const permission = usePermissionStore()

const visibleMenus = computed(() =>
  permission.menus
    .map((group) => ({ ...group, children: (group.children || []).filter((c) => c.visible !== 0) }))
    .filter((group) => group.type !== 'DIR' || (group.children && group.children.length > 0))
)

const scopeText = computed(() => ({
  ALL: '全部数据',
  DEPT: '本部门',
  DEPT_AND_CHILD: '本部门及下级',
  SELF: '仅本人',
  CUSTOM: '自定义'
} as Record<string, string>)[user.dataScope] || user.dataScope || '-')

function onMenuClick(item: any) {
  if (item.external === 1 && item.path) {
    window.open(item.path, '_blank', 'noopener')
  }
}

async function onCommand(command: string) {
  if (command === 'profile') {
    router.push('/profile')
    return
  }
  await ElMessageBox.confirm('确认退出当前账号？', '退出登录', { type: 'warning' })
  await user.signOut()
  permission.reset()
  ElMessage.success('已安全退出')
  router.push('/login')
}
</script>

<style scoped>
.layout { display: flex; height: 100vh; overflow: hidden; }
.sidebar { width: 228px; background: var(--pmp-sidebar); display: flex; flex-direction: column; flex-shrink: 0; }
.brand { display: flex; gap: 10px; align-items: center; padding: 18px 16px; color: #fff; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,.06); }
.logo { width: 34px; height: 34px; border-radius: 9px; background: linear-gradient(135deg,#2563eb,#06b6d4); display: grid; place-items: center; font-weight: 700; }
.brand-text { display: flex; flex-direction: column; line-height: 1.25; }
.brand-text strong { font-size: 14px; }
.brand-text span { font-size: 10.5px; color: #94a3b8; letter-spacing: .3px; }
.menu-scroll { flex: 1; }
:deep(.el-menu) { border-right: none; }
:deep(.el-menu-item.is-active) { background: #1d4ed8 !important; }
:deep(.el-sub-menu__title:hover), :deep(.el-menu-item:hover) { background: #111c30 !important; }
.main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.topbar { height: 56px; background: #fff; border-bottom: 1px solid var(--pmp-border); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; flex-shrink: 0; }
.crumb { display: flex; align-items: center; gap: 6px; color: var(--pmp-muted); font-size: 13px; }
.crumb .root { color: var(--pmp-text); font-weight: 600; }
.right { display: flex; align-items: center; gap: 14px; }
.user { display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--pmp-text); font-size: 13px; }
.name { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.content { flex: 1; overflow: auto; }
@media (max-width: 900px) {
  .sidebar { width: 64px; }
  .brand-text { display: none; }
  .brand { justify-content: center; padding: 14px 8px; }
}
</style>
