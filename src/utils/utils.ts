// 单位处理
export const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px'
}

// 不重复的id
let uudomid = 0
export const uuDomId = (id = 'grid') => {
  uudomid++
  return id + uudomid
}
