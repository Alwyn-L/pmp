import { defineStore } from 'pinia'
import type { Router } from 'vue-router'
import { menus as fetchMenus, type MenuNode } from '@/api/auth'
import { resolveView } from '@/meta/pageRegistry'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menus: [] as MenuNode[],
    ready: false,
    removers: [] as Array<() => void>,
    firstPath: ''
  }),
  actions: {
    async init(router: Router) {
      this.menus = await fetchMenus()
      this.register(router)
      this.ready = true
    },
    register(router: Router) {
      const walk = (nodes: MenuNode[]) => {
        for (const node of nodes) {
          if (node.type === 'MENU' && !node.external && node.visible !== 0 && node.path && node.component) {
            const view = resolveView(node.component)
            if (view) {
              const remove = router.addRoute('layout', {
                path: node.path,
                name: node.component,
                component: view,
                meta: { title: node.name, perm: node.permCode, icon: node.icon }
              })
              this.removers.push(remove)
              if (!this.firstPath) this.firstPath = node.path
            } else {
              console.warn('[permission] 未找到页面组件:', node.component, node.path)
            }
          }
          if (node.children?.length) walk(node.children)
        }
      }
      walk(this.menus)
      this.removers.push(router.addRoute({ path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/error/404.vue') }))
    },
    reset() {
      this.removers.forEach((remove) => remove())
      this.removers = []
      this.menus = []
      this.ready = false
      this.firstPath = ''
    }
  }
})
