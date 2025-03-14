import { request } from '@/service'

const baseUrl = import.meta.env.VITE_API_URL
export const getTags = (): Promise<ApiData<AuthRoute.Route[]>> => {
  return request.get(baseUrl + '/category/get-category')
}
