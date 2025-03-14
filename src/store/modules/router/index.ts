import { defineStore } from 'pinia'
import { getRoutes } from '@/api/user'
import { routeToMenu, getRouterCom } from '@/utils'
import { router } from '@/router'
import type { MenuOption } from 'naive-ui'
import Layout from '@/layout/index.vue'

interface UserRouteState {
  /** 是否初始化完权限路由 */
  routeAuth: boolean
  /** 菜单 */
  menu: MenuOption[]
  routeAuthNum: number
}

export const userRoute = defineStore('userRoute', {
  state: (): UserRouteState => ({
    routeAuth: false,
    menu: [],
    routeAuthNum: 0
  }),
  actions: {
    // 更新权限路由状态
    updateRouteAuth() {
      this.routeAuth = true
    },
    // 添加权限路由
    async handleAuthRoute(path = '') {
      try {
        const { data, code } = await getRoutes()
        if (data?.length && code === 200) {
          const routeInfo = getRouterCom(data)
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
          console.log(router.getRoutes())

          path && router.push(path)
          // @ts-ignore
          this.menu = routeToMenu(routeInfo)
          this.routeAuthNum = 0
        }
      } catch (error) {
        this.routeAuthNum++
      }
    },
    // 重置路由，保留无需权限的初始路由
    resetRoutes() {
      this.$reset()
      const routesData = router.getRoutes()
      routesData.forEach((el) => {
        if (el.meta?.auth) router.removeRoute(el.name as string)
      })
    }
  }
})
