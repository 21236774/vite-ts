import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
import type { App } from 'vue';

routes.push({
  path: '/',
  redirect: '/login',
});

console.log(routes)

export const setupRouter = (app: App) => {
  const router = createRouter({
    history: createWebHashHistory(), // HashHistory
    routes,
  })
  app.use(router)
}