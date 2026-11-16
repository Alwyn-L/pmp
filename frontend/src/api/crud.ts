import client from './client'

export interface PageResult<T> {
  total: number
  page: number
  size: number
  records: T[]
}

export interface ListQuery {
  page: number
  size: number
  keyword?: string
  dateFrom?: string
  dateTo?: string
  [key: string]: any
}

export function fetchList(pageId: string, query: ListQuery) {
  return client.get(`/biz/${pageId}`, { params: query }) as Promise<PageResult<any>>
}

export function fetchDetail(pageId: string, id: number) {
  return client.get(`/biz/${pageId}/${id}`) as Promise<any>
}

export function createRecord(pageId: string, data: any) {
  return client.post(`/biz/${pageId}`, data) as Promise<any>
}

export function updateRecord(pageId: string, id: number, data: any) {
  return client.put(`/biz/${pageId}/${id}`, data) as Promise<any>
}

export function removeRecord(pageId: string, id: number) {
  return client.delete(`/biz/${pageId}/${id}`) as Promise<any>
}

export function batchRemove(pageId: string, ids: number[]) {
  return client.post(`/biz/${pageId}/batch-delete`, { ids }) as Promise<any>
}

export function exportCsv(pageId: string, query: ListQuery) {
  return client.get(`/biz/${pageId}/export`, { params: query, responseType: 'blob' }) as Promise<any>
}
