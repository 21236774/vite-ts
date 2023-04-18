// 设置cookie
export const setCookie = (name: string, value: string, time: number) => {
  const exp = new Date()
  exp.setTime(exp.getTime() + time * 60 * 24 * 60 * 1000) // 这里的time就是天数 escape()编码
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString()
}

// 获取cookie
export const getCookie = <T>(name: T) => {
  const arr = document.cookie.match(
    new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  )
  // 读取cookie          unescape() 解码操作
  if (arr !== null) return unescape(arr[2])
  return null
}
