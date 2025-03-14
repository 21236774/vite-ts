interface Window {
  messageApi: any
}
/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyActions = [boolean, () => void]
}

declare namespace ApiData {
  interface Data<T = any> {
    code: number
    data: T
    msg: string
  }
}

export {}
