import { ref, watch, onUnmounted } from 'vue'
import { useElementSize } from '@vueuse/core'
import * as echarts from 'echarts/core'
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  PolarComponent,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册必须的组件
echarts.use([
  PolarComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

interface ThemeStore {
  theme: 'theme' | 'dark'
}

export const useEcharts = (
  options: ECOption,
  themeStore: ThemeStore = { theme: 'theme' }
) => {
  const domRef = ref<HTMLElement>()
  const initialSize = { width: 0, height: 0 }
  const { width, height } = useElementSize(domRef, initialSize)
  let myChart: echarts.ECharts | null = null
  // 初始化
  const init = (theme: 'theme' | 'dark' = 'theme') => {
    if (domRef.value) {
      myChart = echarts.init(domRef.value, theme)
      myChart.setOption({ ...options, backgroundColor: 'transparent' })
    }
  }

  // 重置
  const resize = () => {
    myChart?.resize()
  }

  // 销毁
  const destroy = () => {
    myChart?.dispose()
  }

  watch([width, height], () => {
    resize()
    init()
  })

  watch(
    () => themeStore.theme,
    (newVal) => {
      destroy()
      init(newVal)
    },
    { deep: true }
  )

  onUnmounted(() => {
    destroy()
  })

  return {
    domRef,
    init
  }
}
