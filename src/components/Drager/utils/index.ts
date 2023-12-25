interface Props {
  isGrid: boolean
  gridX: number
  gridY: number
}
interface Move {
  moveY: number
  moveX: number
}
// 单位处理
export const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px'
}

// 判断是否有父级边界,有则返回父级边界
export const isBoundary = (el: HTMLElement, boundary: Boolean) => {
  if (boundary) {
    const parentElement = el.parentElement || document.body
    // 获取父元素边界
    return parentElement.getBoundingClientRect()
  }
  return false
}

export const getGridPosition = (
  props: Props,
  move: Move,
  parentRect: DOMRect | false
): Move => {
  let moveX = move.moveX
  let moveY = move.moveY
  if (props.isGrid) {
    const remainX = moveX % props.gridX
    const remainY = moveY % props.gridY
    // 偏移量不足时候不偏移、大于时偏移一格
    const halfX = props.gridX / 2
    const halfY = props.gridX / 2
    moveX = remainX > halfX ? moveX - remainX + props.gridX : moveX - remainX
    moveY = remainY > halfY ? moveY - remainY + props.gridY : moveY - remainY
    if (parentRect) {
      // 离父元素移动多少
      const parentLeft = moveX - parentRect.left
      const parentTop = moveY - parentRect.top
      const remainderX = parentLeft % props.gridX > halfX ? props.gridX : 0
      const remainderY = parentTop % props.gridY > halfY ? props.gridY : 0
      const intX = Math.floor(parentLeft / props.gridX) * props.gridX
      const intY = Math.floor(parentTop / props.gridY) * props.gridY
      moveX = parentRect.left + intX + remainderX
      moveY = parentRect.top + intY + remainderY
    }
  }
  return { moveX, moveY }
}
