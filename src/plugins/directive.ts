import type { App } from 'vue';

// 自定义指令
const usersPermissions = ['admin'] // 实际是后端返回的

export const directive = (app: App) => {
  app.directive('has', {
    mounted(el: Element, binding: any) {
      const { value } = binding;
      let f = usersPermissions.some(p => {
        return p.indexOf(value) !== -1;
      });
      if (!f) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  })
}

