<template>
  <div ref="dragRef" :class="['x-drager absolute']" :style="dragStyle">
    <slot />
    <template v-if="isMousedown">
      <div
        v-for="item in dragerList"
        :key="item"
        :class="['drager-dot absolute', item]"
        :data-side="item"
        :style="getDotStyle(item)"
        @mousedown="onDotMousedown(item, $event)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { datProps } from '@/components/Drager/props'
import { dragerList } from '@/components/Drager/drage'
import type { DragerKeyType } from '@/components/Drager/drage'
import {
  getGridPosition,
  isBoundary,
  parentGridPosition
} from '@/components/Drager/utils'
import { uesDrager } from '@/components/Drager/hooks/use-drager'
const props = defineProps(datProps)
const emit = defineEmits(['move', 'resize'])
// 拖拽元素
const dragRef = ref<HTMLElement | null>(null)
const { dragData, isMousedown, dragStyle } = uesDrager(dragRef, props, emit)

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
    const parentRect = isBoundary(el, props.boundary)

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
    if (props.isGrid) {
      const remainX = left % props.gridX
      const remainY = top % props.gridY
      const halfX = props.gridX / 2
      const halfY = props.gridX / 2
      const wRemain = width % props.gridX
      const hRemain = height % props.gridY
      const w = wRemain > halfX ? props.gridX - wRemain : -wRemain
      const h = hRemain > halfY ? props.gridY - hRemain : -hRemain
      const l = remainX > halfX ? props.gridX - remainX : -remainX
      const t = remainY > halfY ? props.gridY - remainY : -remainY
      width += w
      height += h
      if (!parentRect) {
        left += l
        top += t
      }
      const { moveY, moveX } = parentGridPosition(
        props,
        { moveX: left, moveY: top },
        parentRect,
        {
          halfY: remainY,
          halfX: remainX
        }
      )

      left = moveX
      top = moveY
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
    emit && emit('resize', dragData.value)
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}
</script>

<style lang="less">
.x-drager {
  z-index: 1000;
  border: 1px solid #3a7afe;
  cursor: move;
  .drager-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #3a7afe;
    cursor: e-resize;
    transform: translate(-50%, -50%);
    &[data-side*='right'] {
      transform: translate(50%, -50%);
    }
    &[data-side*='bottom'] {
      transform: translate(-50%, 50%);
    }
    &[data-side='bottom-right'] {
      transform: translate(50%, 50%);y
    }
  }
}
</style>
