import { defineStore } from 'pinia'
import { setTheme, setIconColor, setThemeOverrides, themeOverrides } from '@/theme-pack'
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { merge } from 'lodash-es'
import type { StyleName } from '@/theme-pack'
import type { GlobalTheme } from 'naive-ui'

interface State {
  theme: StyleName,
  darkTheme: null | GlobalTheme,
  themeOverrides: GlobalThemeOverrides,
  color: string
}

export const useStoreTheme = defineStore('useStoreTheme', {
  state: (): State => ({
    theme: 'theme',
    darkTheme: null,
    themeOverrides,
    color: 'rgba(24, 160, 88, 0.4)'
  }),
  actions: {
    setTheme(payload: StyleName) {
      this.$state.theme = payload
      setTheme(payload)
    },
    // naive换肤 暗黑模式
    skinning() {
      if(!this.$state.darkTheme) this.$state.darkTheme = darkTheme
      else this.$state.darkTheme = null
    },
    // 切换主题颜色
    setThemeOverrides(color?: string) {
      if(!color) {
        setIconColor()
        return
      }
      this.$state.color = color
      // 这里使用replace是区分字体颜色和背景颜色， 背景颜色需要透明
      const textColor = color.replace(',0.2', ',1')
      this.$state.themeOverrides = merge(this.$state.themeOverrides, setThemeOverrides(color, textColor))
    }
  }
})
