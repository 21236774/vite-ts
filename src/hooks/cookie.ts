export const setCookie = (name: string, value: string, time: number) => {
  var exp = new Date()
  exp.setTime(exp.getTime() + time * 60 * 24 * 60 * 1000) // 这里的time就是天数 escape()编码
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString()
}

export const getCookie = (name: string) => {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  console.log(arr)
  // 读取cookie          unescape() 解码操作
  if (arr != null) return unescape(arr[2]); return null;
}