import { getStorage } from '@/utils';
import type { App } from 'vue';

// 自定义权限指令
export const directive = (app: App) => {
  app.directive('has', {
    mounted(el: Element, binding: any) {
      const { value } = binding;
      const userInfo = getStorage('userInfo') || false
      const usersPermissions = []
      if(userInfo?.userRole) usersPermissions.push(userInfo.userRole)
      const f = usersPermissions.every(p => {
        return value.indexOf(p) !== -1;
      })
      if (!f) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  })
}

