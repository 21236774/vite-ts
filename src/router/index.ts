import { createRouter, createWebHashHistory } from 'vue-router'
import { views } from '@/views'
// import routes from '~pages'
import type { App } from 'vue';
import { createRouterGuard } from './guard'

// 初始路由
export const routes: AuthRoute.Route[] = [
  {
    name: 'login',
    path: '/login',
    component: 'blank',
    meta: {
      title: '登录',
      auth: false
    }
  },
  {
    name: '404',
    path: '/:pathMatch(.*)',
    component: 'blank',
    meta: {
      title: '未找到',
      auth: false
    }
  }
]
// 添加初始路由
export const routeCom = routes.map((item) => {
  const obj = { ...item }
  obj.component = views[item.name]
  return obj
})

export const router = createRouter({
  history: createWebHashHistory(), // HashHistory
  // @ts-ignore 
  routes: routeCom,
})

export const setupRouter = (app: App) => {
  app.use(router)
  createRouterGuard(router)
}