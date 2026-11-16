import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { expiringSoon } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: () => import('@/views/login/index.vue'), meta: { public: true } },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layout/index.vue'),
      redirect: '/workbench',
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/profile/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    },
    { path: '/403', name: 'forbidden', component: () => import('@/views/error/403.vue'), meta: { public: true } }
  ]
})

router.beforeEach(async (to) => {
  const user = useUserStore()
  const permission = usePermissionStore()

  if (to.meta.public) {
    if (to.path === '/login' && user.isLoggedIn) {
      return { path: '/' }
    }
    return true
  }
  if (!user.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  try {
    if (!permission.ready) {
      await user.ensureProfile()
      await permission.init(router)
      const target = to.path === '/' ? permission.firstPath || '/workbench' : to.fullPath
      return { path: target, replace: true }
    }
    if (expiringSoon()) {
      await user.refreshSession()
    }
    return true
  } catch (error) {
    user.reset()
    permission.reset()
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || ''
  document.title = title ? `${title} · PMP 制造协同平台` : 'PMP 制造协同平台'
})

export default router
