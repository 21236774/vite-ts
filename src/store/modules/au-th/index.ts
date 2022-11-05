import { defineStore } from 'pinia'

export const useStoreAuth = defineStore('userAuth', {
  state: () => ({
    account: 'admin',
    password: '123'
  }),
  actions: {
    setUser(playload: string | number) {
      this.$state.account += playload
    }
  }
})
