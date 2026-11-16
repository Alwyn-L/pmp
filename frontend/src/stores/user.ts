import { defineStore } from 'pinia'
import * as authApi from '@/api/auth'
import { saveTokens, saveProfile, clearAuth, accessToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as any,
    perms: [] as string[],
    roles: [] as string[],
    dataScope: ''
  }),
  getters: {
    isLoggedIn: () => !!accessToken(),
    displayName: (state) => state.profile?.nickname || state.profile?.username || '未登录'
  },
  actions: {
    applySession(data: any) {
      saveTokens(data)
      if (data.user) {
        saveProfile(data.user)
        this.applyProfile(data.user)
      }
    },
    applyProfile(profile: any) {
      this.profile = profile
      this.perms = profile?.perms || []
      this.roles = profile?.roles || []
      this.dataScope = profile?.dataScope || ''
    },
    async signIn(username: string, password: string) {
      const data = await authApi.login(username, password)
      this.applySession(data)
    },
    async ensureProfile() {
      if (this.profile) return
      const data = await authApi.profile()
      saveProfile(data)
      this.applyProfile(data)
    },
    async refreshSession() {
      const { refreshToken } = await import('@/utils/auth')
      const res = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken() })
      })
      if (!res.ok) throw new Error('refresh failed')
      const body = await res.json()
      if (body.code !== 0) throw new Error(body.msg || 'refresh failed')
      this.applySession(body.data)
    },
    hasPerm(perm?: string) {
      if (!perm) return true
      return this.perms.includes(perm)
    },
    reset() {
      this.profile = null
      this.perms = []
      this.roles = []
      this.dataScope = ''
      clearAuth()
    },
    async signOut() {
      try {
        await authApi.logout()
      } finally {
        this.reset()
      }
    }
  }
})
