import { style, StyleName } from '@/theme-pack'

// 获取对应的主题色值
export const getThemeMap = (name: StyleName) => {
  return {
    'color-bg-color': style[name].bg,
    'color-text-color': style[name].textColor,
    'color-global-color': style[name].globalColor,
    'color-modal-color': style[name].modalColor,
    'color-active-color': style[name].activeColor,
    'color-bg-main-color': style[name].bgMainColor
  }
}

// 设置深色模式
export const setTheme = (isLight: StyleName) => {
  const themeMap = getThemeMap(isLight)
  type FooType = keyof typeof themeMap
  Object.keys(themeMap).forEach((key) => {
    document
      .getElementsByTagName('body')[0]
      .style.setProperty(`--${key}`, themeMap[key as FooType])
  })
}

// 设置图标颜色
export const setIconColor = (color = 'rgb(24, 160, 88)') => {
  document
    .getElementsByTagName('body')[0]
    .style.setProperty('--icon-color', color)
}
