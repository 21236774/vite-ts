import { h, Component } from 'vue'
import { RouterLink } from 'vue-router'
import {
  LaptopOutline as LaptopIcon,
  SettingsOutline as SettingsIcon,
  MenuSharp as ListIcon,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

interface TabAllList {
  path: string,
  text: string,
  key: string
}

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export const menuOptions: MenuOption[] = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/front'
        }
      },
      { default: () => '仪表盘' }
    ),
    text: '仪表盘',
    key: 'front',
    icon: renderIcon(LaptopIcon)
  },
  {
    label: '列表',
    key: 'pinball-1973',
    icon: renderIcon(ListIcon),
    children: [
      {
        label: () => h(
          RouterLink,
          {
            to: {
              path: '/list'
            }
          },
          { default: () => '表格搜索' }
        ),
        text: '表格搜索',
        key: 'list'
      }
    ]
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/edit'
        }
      },
      { default: () => '系统设置' }
    ),
    key: 'edit',
    text: '系统设置',
    icon: renderIcon(SettingsIcon),
  }
]

export const tabAllList: TabAllList[] = []

const getArr = (arr: MenuOption[]) => {
  arr.forEach(item => {
    if(!item.children) {
      tabAllList.push({
        path: item?.label()?.props.to.path as string,
        text: item.text as string,
        key: item.key as string
      })
    } else {
      getArr(item.children)
    }
  })
}
getArr(menuOptions)


