import { defineStore } from 'pinia'
import { infoRouter, userInfo } from '@/mock/router'
import { setCookie, setStorage, routeToMenu, getRouterCom } from '@/utils'
import { router } from '@/router';
import type { MenuOption } from 'naive-ui'
import Layout from '@/layout/index.vue'

interface UserRouteState {
  /** 是否初始化完权限路由 */
  routeAuth: boolean;
  /** 菜单 */
  menu: MenuOption[]
}

export const userRoute = defineStore('userRoute', {
  state: (): UserRouteState => ({
    routeAuth: false,
    menu: []
  }),
  actions: {
    // 更新权限路由状态
    updateRouteAuth () {
      this.routeAuth = true
    },
    // 添加权限路由
    handleAuthRoute (token: string) {
      const info = userInfo.find(el => el.token === token)
      if(info) {
        const routeInfo = getRouterCom(infoRouter[info?.userName])
        this.routeAuth = true
        const routerLayout = {
          name: 'basic',
          path: '/basic',
          component: Layout,
          meta: {
            title: 'basic',
            auth: true
          },
          children: routeInfo
        }
        
        // @ts-ignore
        router.addRoute(routerLayout)
        setCookie('token', info.token, 1)
        setStorage('userInfo', info)
         // @ts-ignore
        this.menu = routeToMenu(routeInfo)
        
        return routeInfo
      }
      return []
    },
    // 重置路由，保留无需权限的初始路由
    resetRoutes() {
      this.$reset()
      const routesData = router.getRoutes()
      routesData.forEach(el => {
        if(el.meta?.auth) router.removeRoute(el.name as string)
      })
    }
  }
})
