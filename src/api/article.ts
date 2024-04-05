import { request } from '@/service'

export const getArticle = (): any => {
  return request.get('/api-proxy/article/all-list')
}

export const updateArticle = (params: any): any => {
  return request.post('/api-proxy/article/new', { ...params })
}
