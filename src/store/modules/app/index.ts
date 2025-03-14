import { nextTick } from 'vue'
import { defineStore } from 'pinia'

export const useApp = defineStore('useApp', {
  state: () => ({
    refreshFlag: true
  }),
  actions: {
    /**
     * 重新加载的时间
     * @param time
     */
    async onRefresh(time = 100) {
      this.refreshFlag = false
      await nextTick()
      setTimeout(() => {
        this.refreshFlag = true
      }, time)
    }
  }
})
