// 自定义配置naive自己的主题的
import { GlobalThemeOverrides } from 'naive-ui'

// 主题色
export const themeColorList: string[] = [
  'rgba(24,144,255,100)',
  'rgba(64,158,255,100)',
  'rgba(45,140,240,100)',
  'rgba(0,122,255,100)',
  'rgba(90,200,250,100)',
  'rgba(88,86,214,100)',
  'rgba(83,109,254,100)',
  'rgba(156,39,176,100)',
  'rgba(175,82,222,100)',
  'rgba(0,150,199,100)',
  'rgba(0,193,212,100)',
  'rgba(52,199,89,100)',
  'rgba(67,160,71,100)',
  'rgba(124,179,66,100)',
  'rgba(192,202,51,100)',
  'rgba(120,222,199,100)',
  'rgba(229,57,53,100)',
  'rgba(216,27,96,100)',
  'rgba(244,81,30,100)',
  'rgba(251,140,0,100)',
  'rgba(255,179,0,100)',
  'rgba(253,216,53,100)',
  'rgba(109,76,65,100)',
  'rgba(84,110,122,100)'
]

// 这里可以写默认的配置
export const themeOverrides: GlobalThemeOverrides = {
  Layout: {
    color: 'var(--color-bg-main-color)'
  }
}

export const setThemeOverrides = (color: string, textColor: string): GlobalThemeOverrides => {
  return {
    Menu: {
      itemColorActive: color,
      itemColorActiveHover: color,
      itemColorActiveCollapsed: color,
      itemTextColorActive: textColor,
      itemTextColorActiveHover: textColor,
      itemTextColorChildActive: textColor,
      itemTextColorChildActiveHover: textColor,
      itemIconColorActive: textColor,
      itemIconColorActiveHover: textColor,
      itemIconColorActiveHoverHorizontal: textColor,
      itemIconColorChildActive: textColor,
      itemIconColorChildActiveHorizontal: textColor,
    },
    Icon: {
      color: textColor,
    },
    Button: {
      colorInfo: textColor,
      colorHoverInfo: textColor,
      colorPressedInfo: textColor,
      colorFocusInfo: textColor,
      colorDisabledInfo: textColor,
      borderInfo: `1px solid ${textColor}`,
      borderHoverInfo: `1px solid ${textColor}`,
      borderFocusInfo: `1px solid ${textColor}`,
    },
    Tabs: {
      tabTextColorActiveLine: textColor,
      tabTextColorHoverLine: textColor,
      tabTextColorActiveBar: textColor,
      tabTextColorHoverBar: textColor,
      tabTextColorActiveCard: textColor,
      barColor: textColor
    }
  }
}