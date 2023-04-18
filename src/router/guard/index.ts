import type { Router } from 'vue-router'
import { permissionGuard } from './permission'

export const createRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    permissionGuard(to, from, next)
  })
}
