// 登录许可证-登录的一些条件
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router' 
import { getCookie } from '@/utils'

export const permissionGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 未登录、权限页面、
  const isLogin = Boolean(getCookie('token')) // 是否登录
  const permissions = to.path === '/login' ? true : false // 不登录是否有权限进入当前页面
   console.log(to);
  
  const arr: Common.StrategyActions[] = [
    [
      isLogin && to.name === 'login',
      () => {
        // 已登录、访问登录页
        next({ name: 'index-front' })
      }
    ],
    [
      permissions,
      () => {
        // 不需要登录权限直接放行
        next()
      }
    ],
    [
      !isLogin && !permissions,
      () => {
        // 未登录进入需求权限的页面
        const redirect = to.fullPath
        next({ path: '/login', query: { redirect } })
      }
    ],
    [
      isLogin && !permissions,
      () => {
        // 登录状态下有权限直接放行
        next()
      }
    ]
  ]
  
  arr.some(el => {
    const [flag, action] = el
    flag && action()
    return flag
  })
}