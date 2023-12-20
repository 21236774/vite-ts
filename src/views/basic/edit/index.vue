<script setup lang="ts">
import Drager from '@/components/Drager/index.vue'
</script>

<template>
  <div class="w-full h-400 bg-bg-color rounded-2xl">
    <Drager :boundary="true"> 点我拖拽 </Drager>
  </div>
</template>

<style scoped></style>
