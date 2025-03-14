import { defineStore } from 'pinia'
import { getStorage, getCookie, setCookie, setStorage } from '@/utils'
import { loginApi, getUserInfo } from '@/api/user'

interface AuthState {
  /** 用户信息 */
  userInfo: User.UserApiInfo
  /** 凭证 */
  token: string
}

export const useStoreAuth = defineStore('userAuth', {
  state: (): AuthState => ({
    userInfo: getStorage('userInfo') || {},
    token: getCookie('token') || ''
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token)
    }
  },
  actions: {
    /** 根据token进行登录 */
    loginToken() {
      getUserInfo().then(({ code, data }) => {
        if (code === 200) this.userInfo = data
      })
    },
    /** 根据账号密码进行登录 */
    async userPwdLogin(info: User.UserInfo): Promise<boolean> {
      const { data, code } = await loginApi(info)
      if (code === 200) {
        this.userInfo = data
        setCookie('token', data?.token, 1)
        setStorage('userInfo', data)
        return true
      }
      return false
    }
  }
})
