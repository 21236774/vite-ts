// 单位处理
export const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px'
}
