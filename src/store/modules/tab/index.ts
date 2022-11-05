import { defineStore } from 'pinia'
interface TabActive {
  key: string,
  text: string,
  path?: string
}

interface Store {
  tabsList: TabActive[],
  tabActive?: TabActive | {}
}

export const useTab = defineStore('useTab', {
  state: (): Store => ({
    tabsList: [],
    tabActive: {
      text: '',
      key: '',
    }
  }),
  actions: {
    // 删除其中一项
    delTabsList(key: string) {
      const arr = this.$state.tabsList.filter(element => element.key !== key)
      this.$state.tabsList = arr
      return arr
    },
    // 更新tab、判断是否存在，存在则跳转，不存在添加后跳转
    updateTabs(params: TabActive | undefined) {
      if(!params) return
      this.$state.tabActive = params
      const obj = this.$state.tabsList.find(el => el.key === params.key)
      if(!obj) this.$state.tabsList.push(params) 
      // 跳转
      console.log(this.$state.tabsList)
    }
  }
})
