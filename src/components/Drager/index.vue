<template>
  <div
    ref="dragRef"
    :class="['x-drager absolute']"
    :style="dragStyle"
    @mousedown="onMousedown"
  >
    <slot />
    <div v-if="isMousedown">
      <div
        v-for="item in dragerList"
        :key="item"
        :class="['drager-dot absolute', item]"
        :data-side="item"
        :style="getDotStyle(item)"
        @mousedown="onDotMousedown(item, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
// 单位处理
const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px'
}

const dragerList = [
  'left',
  'top',
  'right',
  'bottom',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right'
]

type DragerKeyType = (typeof dragerList)[number]

const props = defineProps({
  boundary: {
    // 边界
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String],
    default: 100
  },
  height: {
    type: [Number, String],
    default: 100
  },
  left: {
    type: [Number, String],
    default: 0
  },
  top: {
    type: [Number, String],
    default: 0
  },
  color: {
    type: String,
    default: '#3a7afe'
  }
})
const emit = defineEmits(['move', 'resize'])

// 拖拽元素
const dragRef = ref<HTMLElement | null>(null)
// 是否按下鼠标
const isMousedown = ref(false)
// 拖拽数据
const dragData = ref({
  width: props.width,
  height: props.height,
  left: props.left,
  top: props.top
})

const dragStyle = computed(() => {
  const { width, height, left, top } = dragData.value
  console.log(dragRef)
  return {
    width: withUnit(width),
    height: withUnit(height),
    left: withUnit(left),
    top: withUnit(top)
  }
})

// 计算圆点位置
function getDotStyle(item: DragerKeyType) {
  const [side, position] = item.split('-')
  const style = { [side]: '0%' }
  if (!position) {
    const side2 = ['top', 'bottom'].includes(side) ? 'left' : 'top'
    style[side2] = '50%'
  } else {
    style[position] = '0%'
  }

  return style
}

// 判断是否有父级边界
const isBoundary = (el: HTMLElement) => {
  if (props.boundary) {
    const parentElement = el.parentElement || document.body
    // 获取父元素边界
    return parentElement.getBoundingClientRect()
  }
  return false
}

/**
 * 盒子鼠标按下事件
 */
function onMousedown(e: MouseEvent) {
  isMousedown.value = true
  const el = dragRef.value!
  const elRect = el.getBoundingClientRect()

  // 记录按下的位置
  const downX = e.clientX
  const downY = e.clientY

  let minX = 0,
    maxX = 0,
    minY = 0,
    maxY = 0
  const parentRect = isBoundary(el)
  if (parentRect) {
    // 获取X轴最小值
    minX = parentRect.left
    // 获取x轴最大值
    maxX = parentRect.left + parentRect.width - elRect.width
    // 获取Y轴最小值
    minY = parentRect.top
    // 获取Y轴最大值
    maxY = parentRect.top + parentRect.height - elRect.height
  }

  // 鼠标在盒子里的位置
  const mouseX = downX - elRect.left
  const mouseY = downY - elRect.top

  const onMousemove = (e: MouseEvent) => {
    // 当前鼠标的位置减去鼠标在盒子里的位置就是要移动的距离
    let moveX = e.clientX - mouseX
    let moveY = e.clientY - mouseY

    if (props.boundary) {
      // 超过最大和最小边界直接等于边界值
      moveX = moveX > maxX ? maxX : moveX < minX ? minX : moveX
      moveY = moveY > maxY ? maxY : moveY < minY ? minY : moveY
    }

    dragData.value.left = moveX
    dragData.value.top = moveY
    emit && emit('move', dragData.value)
  }

  const onMouseup = (_e: MouseEvent) => {
    // isMousedown.value = false
    // 移除document事件
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  // 位document注册鼠标移动事件
  document.addEventListener('mousemove', onMousemove)
  // 鼠标抬起事件
  document.addEventListener('mouseup', onMouseup)
}

// 圆点按下事件
const onDotMousedown = (item: DragerKeyType, e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  const el = dragRef.value!
  const elRect = el.getBoundingClientRect()
  const [side, position] = item.split('-')

  const positionT = side === 'top' // 是否是上方的改变top值
  const positionL = [side, position].includes('left') // 判断是否左方向的改变left值

  // 记录按下的位置
  const downX = e.clientX
  const downY = e.clientY
  const onMousemove = (e: MouseEvent) => {
    const clienX = e.clientX - downX
    const clienY = e.clientY - downY
    const parentRect = isBoundary(el)

    let width = elRect.width + (positionL ? -clienX : clienX)
    let height = elRect.height + (positionT ? -clienY : clienY)
    let left = elRect.left + (positionL ? clienX : 0)
    let top = elRect.top + (positionT ? clienY : 0)
    if (!position) {
      // 正方位处理
      if (['top', 'bottom'].includes(side)) width = elRect.width
      else height = elRect.height
    }

    // 处理负方向
    if (width < 0) {
      width = -width
      left -= width
    }
    if (height < 0) {
      height = -height
      top -= height
    }
    if (parentRect) {
      if (
        e.clientX <= parentRect.left ||
        e.clientX >= parentRect.right ||
        e.clientY <= parentRect.top ||
        e.clientY >= parentRect.bottom
      ) {
        return
      }
    }
    dragData.value = { width, height, left, top }
  }
  const onMouseup = (_e: MouseEvent) => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

// 初始化位置
onMounted(() => {
  if (props.boundary && !props.left && !props.top) {
    const el = dragRef.value!
    const parentRect = isBoundary(el)
    dragData.value.left = parentRect ? parentRect?.left : 0
    dragData.value.top = parentRect ? parentRect?.top : 0
  }
})
</script>

<style lang="less">
.x-drager {
  z-index: 1000;
  border: 1px solid #3a7afe;
  .drager-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #3a7afe;
    transform: translate(-50%, -50%);
    &[data-side*='right'] {
      transform: translate(50%, -50%);
    }
    &[data-side*='bottom'] {
      transform: translate(-50%, 50%);
    }
    &[data-side='bottom-right'] {
      transform: translate(50%, 50%);
    }
  }
}
</style>
