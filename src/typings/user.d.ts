declare namespace User {
  interface UserInfo {
    /** 路由标题 */
    name: string
    password: string | number
  }
  interface UserApiInfo {
    /** 路由标题 */
    userName: string
    password?: string | number
    token: string
    userRole: string
    id: number
  }
}
