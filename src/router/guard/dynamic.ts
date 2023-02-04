/** 动态路由 */
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getCookie, routerFlat } from '@/utils'
import { userRoute } from '@/store'


export const dynamicGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext):boolean => {
  const token = getCookie('token') || '' // 是否登录
  const store = userRoute()
  const redirect = to.path === '/' ? import.meta.env.VITE_ROUTE_HOME_PATH : to.path
  
  if(!store.routeAuth) {
    const routeInfo = routerFlat(store.handleAuthRoute(token))
    
    // 没有登录回登录页
    if(!token || !routeInfo.length) {
      if(redirect === '/login') next()
      else next({ path: '/login', query: { redirect } })
      return true
    }

    const index = routeInfo.findIndex(el => el.path === to.path)
    if(index > -1) {
      next({ name: routeInfo[index].name, path: routeInfo[index].path })
      return true
    }
    return false
  }
  return false
}