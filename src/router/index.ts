import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
import type { App } from 'vue';
import { createRouterGuard } from './guard'

// 后续路由改造一下
routes[0].redirect = '/front'

export const setupRouter = (app: App) => {
  const router = createRouter({
    history: createWebHashHistory(), // HashHistory
    routes,
  })
  app.use(router)
  createRouterGuard(router)
}