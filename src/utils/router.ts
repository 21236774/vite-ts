import { RouterLink } from 'vue-router'
import { h, Component } from 'vue'
import { NIcon } from 'naive-ui'
import { views } from '@/views'
import type { MenuOption } from 'naive-ui'
import {
  LaptopOutline as LaptopIcon,
  SettingsOutline as SettingsIcon,
  MenuSharp as ListIcon,
  LogoOctocat as LogoOctocatIcon,
  DocumentTextOutline as ArticleIcon,
  PeopleOutline as AccountIcon,
  PricetagOutline as ArticleTypeIcon,
  SparklesOutline as DefaultIcon,
  ListCircleOutline as ArticleListIcon,
  ExtensionPuzzleOutline as PluginsIcon
} from '@vicons/ionicons5'

const menuIcon = {
  LaptopIcon,
  SettingsIcon,
  ListIcon,
  LogoOctocatIcon,
  ArticleIcon,
  AccountIcon,
  ArticleTypeIcon,
  DefaultIcon,
  ArticleListIcon,
  PluginsIcon
}

const getIcon = (icon: AuthRoute.MenuIcon = 'DefaultIcon') => {
  return menuIcon[icon]
}

/** 路由扁平化处理 */
export const routerFlat = (arr: AuthRoute.Route[]) => {
  const routeFlat: AuthRoute.Route[] = []
  const flatFn = (routerArr: AuthRoute.Route[]) => {
    routerArr.forEach((el) => {
      routeFlat.push(el)
      if (el?.children) {
        flatFn(el.children)
      }
    })
  }
  flatFn(arr)
  return routeFlat
}

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

/** 权限路由生成菜单 */
export const routeToMenu = (routeInfo: AuthRoute.Route[]) => {
  const menu: MenuOption[] = []
  routeInfo.forEach((el) => {
    let menuChildren: MenuOption[] | undefined = []
    if (el.children) {
      menuChildren = routeToMenu(el.children)
    }
    const obj: MenuOption = {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              path: menuChildren?.length ? '' : el.path // 当有多级菜单时候，点击不跳路由
            }
          },
          { default: () => el.meta?.title }
        ),
      text: el.meta?.title,
      key: el.path,
      path: el.path,
      icon: renderIcon(getIcon(el.meta?.icon)) // 后面在换图标吧
    }
    if (menuChildren.length) obj.children = menuChildren
    menu.push(obj)
  })
  return menu
}

/** 路由name匹配对应组件 */
export const getRouterCom = (
  routeInfo: AuthRoute.Route[]
): AuthRoute.Route[] => {
  const routerArr: AuthRoute.Route[] = []
  routeInfo.forEach((el) => {
    const obj = { ...el }
    // @ts-ignore
    obj.component = views[el.name]
    let routerChildren: AuthRoute.Route[] = []
    if (obj?.children?.length) {
      routerChildren = getRouterCom(obj.children)
    }
    obj.children = routerChildren
    routerArr.push(obj)
  })
  return routerArr
}
