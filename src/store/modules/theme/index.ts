import { defineStore } from 'pinia'
import {
  setTheme,
  setIconColor,
  setThemeOverrides,
  themeOverrides
} from '@/theme-pack'
import { GlobalThemeOverrides } from 'naive-ui'
import { merge } from 'lodash-es'
import type { StyleName } from '@/theme-pack'

interface State {
  theme: StyleName
  themeOverrides: GlobalThemeOverrides
  color: string
}

export const useStoreTheme = defineStore('useStoreTheme', {
  state: (): State => ({
    theme: 'theme',
    themeOverrides,
    color: 'rgba(24, 160, 88, 0.4)'
  }),
  getters: {
    getThemeOverrides(): GlobalThemeOverrides {
      return this.themeOverrides
    },
    getTheme(): StyleName {
      return this.theme
    },
    getColor(): string {
      return this.color
    }
  },
  actions: {
    setTheme(payload: StyleName) {
      this.$state.theme = payload
      setTheme(payload)
    },
    // 切换主题颜色
    setThemeOverrides(color?: string) {
      if (!color) {
        setIconColor()
        return
      }
      this.$state.color = color
      // 这里使用replace是区分字体颜色和背景颜色， 背景颜色需要透明
      const textColor = color.replace(',0.2', ',1')
      this.$state.themeOverrides = merge(
        this.$state.themeOverrides,
        setThemeOverrides(color, textColor)
      )
    }
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'themes', storage: localStorage }]
  }
})
