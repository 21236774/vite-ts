import { useRouter } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
/** 
 * 路由跳转
 * @param inSetup - 是否在vue页面/组件的setup里面调用，在axios里面无法使用useRouter和useRoute
*/
export function useRouterPush(inSetup = true) {
  const router = useRouter()
  /**
   * @params - 需要跳转的路由
   * @param newTab - 是否在新的浏览器Tab标签打开
   */
  const routerPush = (to: RouteLocationRaw, newTab = false) => {
    if(newTab) {
      const routerData = router.resolve(to);
      window.open(routerData.href, '_blank');
    } else {
      router.push(to)
    }
  }

  /**
   * 跳转首页
   * @param newTab - 在新的浏览器标签打开
   */
  function toHome(newTab = false) {
    routerPush('/front', newTab)
  }
  
  /** 返回上一级路由 */
  function routerBack() {
    router.go(-1);
  }

  return {
    routerPush,
    toHome,
    routerBack
  }

}