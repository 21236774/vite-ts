<script setup lang="ts">
import { ref } from 'vue'
import { uuDomId } from '@/utils'
defineProps({
  gridWidth: {
    type: [Number, String],
    default: '100%'
  },
  gridHeight: {
    type: [Number, String],
    default: '100%'
  },
  gridX: {
    type: Number,
    default: 20
  },
  gridY: {
    type: Number,
    default: 20
  },
  gridColor: {
    type: String,
    default: 'rgba(0,0,0,0.1)'
  }
})
const grid = ref(uuDomId('x-grid-'))
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="gridWidth"
    :height="gridHeight"
  >
    <defs>
      <pattern
        :id="grid"
        :width="gridX"
        :height="gridY"
        patternUnits="userSpaceOnUse"
      >
        <rect width="100%" height="100%" fill="none" :stroke="gridColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${grid})`" />
  </svg>
</template>

<style scoped></style>
