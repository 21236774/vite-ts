import {
  onMounted,
  Ref,
  unref,
  ref,
  ExtractPropTypes,
  onUnmounted,
  computed
} from 'vue'
import { datProps } from '@/components/Drager/props'
import {
  getGridPosition,
  isBoundary,
  withUnit
} from '@/components/Drager/utils'

export const uesDrager = (
  dragRef: Ref<HTMLElement | null>,
  props: ExtractPropTypes<typeof datProps>,
  emit: Function
) => {
  // 拖拽数据
  const dragData = ref({
    width: props.width,
    height: props.height,
    left: props.left,
    top: props.top
  })
  const isMousedown = ref(false)

  const dragStyle = computed(() => {
    const { width, height, left, top } = dragData.value
    return {
      width: withUnit(width),
      height: withUnit(height),
      left: withUnit(left),
      top: withUnit(top)
    }
  })
  // 盒子按下事件
  const onMousedown = (e: MouseEvent) => {
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
    const parentRect = isBoundary(el, props.boundary)
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
      // 有网格时候的移动
      const move = getGridPosition(props, { moveX, moveY }, parentRect)
      moveX = move.moveX
      moveY = move.moveY
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

  onMounted(() => {
    const dragDom = unref(dragRef)
    if (!dragDom) return
    dragDom.addEventListener('mousedown', onMousedown)
    if (props.boundary && !props.left && !props.top) {
      const el = dragRef.value!
      const parentRect = isBoundary(el, true)
      dragData.value.left = parentRect ? parentRect?.left : 0
      dragData.value.top = parentRect ? parentRect?.top : 0
    }
  })
  onUnmounted(() => {
    dragRef.value?.removeEventListener('mousedown', onMousedown)
  })
  return { dragData, isMousedown, dragStyle }
}
