import { request } from '@/service'

export const getRoutes = (): Promise<ApiData<AuthRoute.Route[]>> => {
  return request.get('/api-proxy/users/router')
}
// 获取用户信息
export const getUserInfo = (): Promise<ApiData<User.UserApiInfo>> => {
  return request.get('/api-proxy/users/userInfo')
}

// 登录
export const loginApi = (
  info: User.UserInfo
): Promise<ApiData<User.UserApiInfo>> => {
  return request.post('/api-proxy/users/login', { ...info })
}

// 退出登录
export const logoutApi = () => {
  return request.get('/api-proxy/users/logout')
}
