// 登录许可证-登录的一些条件
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getCookie } from '@/utils'
import { dynamicGuard } from './dynamic'

// 路由拦截
export const permissionGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  // 未登录、权限页面、
  const isLogin = Boolean(getCookie('token')) // 是否登录
  const permissions = await dynamicGuard(to, from, next) // 判断是否权限路由以及权限路由处理
  const needLogin = Boolean(to.meta.auth) // 是否需求登录权限的页面
  console.log(permissions)
  if (permissions) return
  const arr: Common.StrategyActions[] = [
    [
      isLogin && to.name === 'login',
      () => {
        // 已登录、访问登录页跳转到首页
        next({ path: import.meta.env.VITE_ROUTE_HOME_PATH })
      }
    ],
    [
      isLogin && to.path === '/',
      () => {
        // 已登录、访问 / 跳转首页
        next({ path: import.meta.env.VITE_ROUTE_HOME_PATH })
      }
    ],
    [
      !needLogin,
      () => {
        // 不需要登录权限直接放行
        next()
      }
    ],
    [
      !isLogin && needLogin,
      () => {
        // 未登录进入需求权限的页面
        const redirect = to.fullPath
        next({ path: '/login', query: { redirect } })
      }
    ],
    [
      isLogin && needLogin && !permissions,
      () => {
        // 登录状态下有权限直接放行
        next()
      }
    ]
  ]

  arr.some((el, index) => {
    const [flag, action] = el
    flag && action()
    return flag
  })
}
