const ACCESS = 'pmp_access_token'
const REFRESH = 'pmp_refresh_token'
const EXPIRE = 'pmp_access_expire'
const PROFILE = 'pmp_profile'

export interface TokenBundle {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export function saveTokens(bundle: TokenBundle) {
  localStorage.setItem(ACCESS, bundle.accessToken)
  localStorage.setItem(REFRESH, bundle.refreshToken)
  localStorage.setItem(EXPIRE, String(Date.now() + bundle.expiresIn * 1000))
}

export function accessToken() {
  return localStorage.getItem(ACCESS) || ''
}

export function refreshToken() {
  return localStorage.getItem(REFRESH) || ''
}

export function accessExpireAt() {
  return Number(localStorage.getItem(EXPIRE) || 0)
}

export function expiringSoon(seconds = 300) {
  const expire = accessExpireAt()
  return expire > 0 && expire - Date.now() < seconds * 1000
}

export function saveProfile(profile: any) {
  localStorage.setItem(PROFILE, JSON.stringify(profile))
}

export function cachedProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE) || 'null')
  } catch {
    return null
  }
}

export function clearAuth() {
  localStorage.removeItem(ACCESS)
  localStorage.removeItem(REFRESH)
  localStorage.removeItem(EXPIRE)
  localStorage.removeItem(PROFILE)
}
