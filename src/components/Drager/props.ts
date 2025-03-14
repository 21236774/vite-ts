export const datProps = {
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
  },
  isGrid: {
    type: Boolean,
    default: false
  },
  gridX: {
    type: Number,
    default: 20
  },
  gridY: {
    type: Number,
    default: 20
  }
}
