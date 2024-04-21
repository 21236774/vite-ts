import { request } from '@/service'

export const getTags = (): Promise<ApiData<AuthRoute.Route[]>> => {
  return request.get('/api-proxy/category/get-category')
}
