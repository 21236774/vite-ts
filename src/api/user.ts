import { request } from '@/service'

const baseUrl = import.meta.env.VITE_API_URL
export const getRoutes = (): Promise<ApiData<AuthRoute.Route[]>> => {
  return request.get(baseUrl + '/users/router')
}
// 获取用户信息
export const getUserInfo = (): Promise<ApiData<User.UserApiInfo>> => {
  return request.get(baseUrl + '/users/user-info')
}

// 登录
export const loginApi = (
  info: User.UserInfo
): Promise<ApiData<User.UserApiInfo>> => {
  return request.post(baseUrl + '/users/login', { ...info })
}

// 退出登录
export const logoutApi = () => {
  return request.get(baseUrl + '/users/logout')
}
