/** 动态路由 */
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getCookie, routerFlat } from '@/utils'
import { userRoute } from '@/store'

export const dynamicGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<boolean> => {
  const token = getCookie('token') || '' // 是否登录
  const store = userRoute()

  const redirect =
    to.path === '/' ? import.meta.env.VITE_ROUTE_HOME_PATH : to.fullPath
  if (!store.routeAuth) {
    // 没有登录回登录页
    if (!token) {
      if (redirect === '/login') next()
      else next({ path: '/login', query: { redirect } })
      return true
    }
    if (to.name === '404') next(false)
    await store.handleAuthRoute(redirect)
    if (store.routeAuthNum) {
      next('/login')
      return true
    }
    if (store.routeAuth) {
      return true
    }
    return false
  }
  // 权限路由已经加载，仍然未找到，重定向到404
  if (to.name === '404') {
    next({ name: '404', replace: true })
    console.log(777)
    return false
  }
  return false
}
