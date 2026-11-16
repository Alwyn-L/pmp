import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { accessToken, refreshToken, saveTokens, clearAuth } from '@/utils/auth'

const instance = axios.create({ baseURL: '/api/v1', timeout: 20000 })

let refreshing: Promise<boolean> | null = null

function uuid() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

async function doRefresh(): Promise<boolean> {
  const token = refreshToken()
  if (!token) return false
  if (!refreshing) {
    refreshing = axios.post('/api/v1/auth/refresh', { refreshToken: token })
      .then((res) => {
        const body = res.data
        if (body?.code !== 0 || !body?.data) return false
        saveTokens(body.data)
        return true
      })
      .catch(() => false)
      .finally(() => { refreshing = null })
  }
  return refreshing
}

instance.interceptors.request.use((config) => {
  const token = accessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers['X-Request-Id'] = uuid()
  return config
})

instance.interceptors.response.use(
  async (response) => {
    if (response.config.responseType === 'blob') return response
    const body = response.data
    if (body && typeof body === 'object' && 'code' in body) {
      if (body.code === 0) return body.data
      ElMessage.error(body.msg || '操作失败')
      return Promise.reject(new Error(body.msg || '操作失败'))
    }
    return body
  },
  async (error) => {
    const response = error.response
    const config = (response?.config || {}) as AxiosRequestConfig & { _retry?: boolean }
    if (response?.status === 401) {
      const url = String(config.url || '')
      // 登录/刷新接口自身返回 401 时直接提示，不触发刷新流程
      if (url.includes('/auth/login') || url.includes('/auth/refresh')) {
        ElMessage.error(response.data?.msg || '账号或密码错误')
        return Promise.reject(error)
      }
      if (!config._retry) {
        const ok = await doRefresh()
        if (ok) {
          config._retry = true
          config.headers = { ...(config.headers || {}), Authorization: `Bearer ${accessToken()}` }
          return instance(config)
        }
        const body = response.data || {}
        clearAuth()
        ElMessage.error(body.msg || '登录已失效，请重新登录')
        const redirect = encodeURIComponent(window.location.pathname + window.location.search)
        window.location.href = `/login?redirect=${redirect}`
        return Promise.reject(error)
      }
      return Promise.reject(error)
    }
    if (response?.status === 403) {
      ElMessage.error(response.data?.msg || '无权访问该资源')
      return Promise.reject(error)
    }
    const msg = response?.data?.msg || (error.message === 'Network Error' ? '网络异常，请检查连接' : '服务异常，请稍后重试')
    ElMessage.error(msg)
    return Promise.reject(error)
  }
)

export default instance
