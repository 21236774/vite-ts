import { request } from '@/service'

const baseUrl = import.meta.env.VITE_API_URL
export const getArticle = (): any => {
  return request.get(baseUrl + '/article/all-list')
}

export const getUserArticle = (params: any): any => {
  return request.post(baseUrl + '/article/user-list', { ...params })
}

export const updateArticle = (params: any): any => {
  return request.post(baseUrl + '/article/new', { ...params })
}

export const delArticle = (id: string): any => {
  return request.get(baseUrl + '/article/del?id=' + id)
}
