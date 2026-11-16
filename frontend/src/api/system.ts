import client from './client'

/* ---------------------------------- 用户 ---------------------------------- */
export const listUsers = (params: any) => client.get('/system/users', { params }) as Promise<any>
export const createUser = (data: any) => client.post('/system/users', data) as Promise<any>
export const updateUser = (id: number, data: any) => client.put(`/system/users/${id}`, data) as Promise<any>
export const deleteUser = (id: number) => client.delete(`/system/users/${id}`) as Promise<any>
export const changeUserStatus = (id: number, status: string) =>
  client.put(`/system/users/${id}/status`, { status }) as Promise<any>
export const resetPassword = (id: number, password: string) =>
  client.post(`/system/users/${id}/reset-password`, { password }) as Promise<any>
export const kickUser = (id: number) => client.post(`/system/users/${id}/kick`) as Promise<any>
export const userRoles = (id: number) => client.get(`/system/users/${id}/roles`) as Promise<number[]>
export const bindUserRoles = (id: number, roleIds: number[]) =>
  client.put(`/system/users/${id}/roles`, { roleIds }) as Promise<any>
export const userOptions = () => client.get('/system/users/options') as Promise<any>

/* ---------------------------------- 角色 ---------------------------------- */
export const listRoles = (params: any) => client.get('/system/roles', { params }) as Promise<any>
export const allRoles = () => client.get('/system/roles/all') as Promise<any[]>
export const createRole = (data: any) => client.post('/system/roles', data) as Promise<any>
export const updateRole = (id: number, data: any) => client.put(`/system/roles/${id}`, data) as Promise<any>
export const deleteRole = (id: number) => client.delete(`/system/roles/${id}`) as Promise<any>
export const changeRoleStatus = (id: number, status: string) =>
  client.put(`/system/roles/${id}/status`, { status }) as Promise<any>
export const roleMenus = (id: number) => client.get(`/system/roles/${id}/menus`) as Promise<number[]>
export const bindRoleMenus = (id: number, menuIds: number[]) =>
  client.put(`/system/roles/${id}/menus`, { menuIds }) as Promise<any>
export const changeRoleScope = (id: number, data: any) =>
  client.put(`/system/roles/${id}/data-scope`, data) as Promise<any>
export const roleUsers = (id: number, params: any) =>
  client.get(`/system/roles/${id}/users`, { params }) as Promise<any>
export const unbindRoleUser = (id: number, userId: number) =>
  client.delete(`/system/roles/${id}/users/${userId}`) as Promise<any>

/* ---------------------------------- 菜单 ---------------------------------- */
export const menuTree = () => client.get('/system/menus/tree') as Promise<any[]>
export const createMenu = (data: any) => client.post('/system/menus', data) as Promise<any>
export const updateMenu = (id: number, data: any) => client.put(`/system/menus/${id}`, data) as Promise<any>
export const deleteMenu = (id: number) => client.delete(`/system/menus/${id}`) as Promise<any>
export const sortMenus = (items: any[]) => client.put('/system/menus/sort', items) as Promise<any>

/* ---------------------------------- 部门 ---------------------------------- */
export const deptTree = () => client.get('/system/depts/tree') as Promise<any[]>
export const createDept = (data: any) => client.post('/system/depts', data) as Promise<any>
export const updateDept = (id: number, data: any) => client.put(`/system/depts/${id}`, data) as Promise<any>
export const deleteDept = (id: number) => client.delete(`/system/depts/${id}`) as Promise<any>

/* ---------------------------------- 日志 ---------------------------------- */
export const loginLogs = (params: any) => client.get('/system/logs/login', { params }) as Promise<any>
export const operLogs = (params: any) => client.get('/system/logs/oper', { params }) as Promise<any>
