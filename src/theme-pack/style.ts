export type StyleName = keyof Style;
export type ThemeColor = 'default' | 'dark'

interface StyleItem {
  bg: string,
  textColor: string,
  bgOpacity: number,
  globalColor: string,
  modalColor:  string
}

export interface Style {
  default: StyleItem,
  dark: StyleItem
}

// 颜色主题配置颜色
export const style:Style = {
  default: {
    bg: '#f1f1f1',
    textColor: '#333',
    bgOpacity: 1,
    globalColor: '#fff',
    modalColor: '#fff'
  },
  dark: {
    bg: 'rgba(24,24,28, 1)',
    textColor: '#bbb',
    bgOpacity: 1,
    globalColor: 'rgba(16,16,20)',
    modalColor: 'rgb(44, 44, 50)'
  }
}
