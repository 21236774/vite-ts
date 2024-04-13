import { request } from '@/service'

export const getArticle = (): any => {
  return request.get('/api-proxy/article/all-list')
}

export const getUserArticle = (params: any): any => {
  return request.post('/api-proxy/article/user-list', { ...params })
}

export const updateArticle = (params: any): any => {
  return request.post('/api-proxy/article/new', { ...params })
}

export const delArticle = (id: string): any => {
  return request.get('/api-proxy/article/del?id=' + id)
}
