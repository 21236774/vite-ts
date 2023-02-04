import { defineStore } from 'pinia'
import { getStorage, getCookie, setCookie, setStorage } from '@/utils'
import { userInfo } from '@/mock/router'

export const useStoreAuth = defineStore('userAuth', {
  state: () => ({
    userInfo: getStorage('userInfo') || {},
    token: getCookie('token') || ''
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    /** 根据token进行登录 */
    loginToken(token: string) {
      const info = userInfo.find(el => el.token === token)
      if(info) {
        this.userInfo = info
        this.token = info.token
        return true
      }
      return false
    },
    /** 根据账号密码进行登录 */
    userPwdLogin(info: { account: string | number, password: string | number }): boolean {
      const { account, password } = info
      const infoData = userInfo.find(el => el.userName === account)
      if(infoData) {
        if(password === infoData.password) {
          this.userInfo = infoData
          setCookie('token', infoData.token, 1)
          setStorage('userInfo', infoData)
          return true
        }
      }
      return false
    },
  }
})
