import client from './client'

export interface MenuNode {
  id: number
  parentId: number
  name: string
  type: 'DIR' | 'MENU' | 'BUTTON' | 'LINK'
  path?: string
  component?: string
  icon?: string
  permCode?: string
  sort: number
  visible: number
  external: number
  children?: MenuNode[]
}

export function login(username: string, password: string) {
  return client.post('/auth/login', { username, password }) as Promise<any>
}

export function logout() {
  return client.post('/auth/logout')
}

export function profile() {
  return client.get('/auth/profile') as Promise<any>
}

export function menus() {
  return client.get('/auth/menus') as Promise<MenuNode[]>
}
