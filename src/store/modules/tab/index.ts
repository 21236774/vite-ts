import { defineStore } from 'pinia'
export interface TabActive {
  key: string
  text: string
  path: string
}

interface Store {
  tabsList: TabActive[]
  tabActive?: TabActive
}

// 可以写成函数式 export const useTab = defineStore('useTab', () => { return {} })
export const useTab = defineStore('useTab', {
  state: (): Store => ({
    tabsList: [],
    tabActive: {
      text: '',
      key: '',
      path: ''
    }
  }),
  actions: {
    // 重置状态
    resetTab() {
      this.$reset()
    },
    // 删除其中一项
    delTabsList(key: string) {
      const arr = this.tabsList.filter((element) => element.key !== key)
      if (key === this.tabActive?.key) {
        this.tabActive = arr[arr.length - 1]
      }
      this.tabsList = arr
    },
    // 更新tab、判断是否存在，存在则跳转，不存在添加后跳转
    updateTabs(params: TabActive | undefined) {
      if (!params) return
      this.tabActive = params
      const obj = this.tabsList.find((el) => el.key === params.key)
      if (!obj) this.tabsList.push(params)
    }
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'tabs', storage: localStorage }]
  }
})
