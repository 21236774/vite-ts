export type StyleName = keyof Style;
export type ThemeColor = 'theme' | 'dark'

interface StyleItem {
  bg: string,
  textColor: string,
  bgOpacity: number,
  globalColor: string,
  modalColor: string,
  activeColor: string,
  bgMainColor: string,
}

export interface Style {
  theme: StyleItem,
  dark: StyleItem
}

// 颜色主题配置颜色
export const style:Style = {
  theme: {
    bg: '#fff', // 盒子背景
    textColor: '#333',
    bgOpacity: 1,
    globalColor: '#fff',
    modalColor: '#fff',
    activeColor: '#dddddd',
    bgMainColor: '#f4f5f5' // 布局背景
  },
  dark: {
    bg: 'rgba(24,24,28, 1)',
    textColor: '#bbb',
    bgOpacity: 1,
    globalColor: 'rgba(16,16,20)',
    modalColor: 'rgb(44, 44, 50)',
    activeColor: 'rgb(80, 80, 80)',
    bgMainColor: 'rgb(16, 16, 20)'
  }
}
