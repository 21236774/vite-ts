<script setup lang="ts">
import Drager from '@/components/Drager/index.vue'
import Grid from '@/components/Grid/index.vue'
</script>

<template>
  <div class="w-full h-400 bg-bg-color rounded-2xl">
    <Drager :boundary="true"> 点我拖拽 </Drager>
    <Drager :boundary="true"> 点我拖拽2 </Drager>
  </div>
  <div class="flex justify-between mt-10 h-201">
    <div class="w-6/12 h-full bg-bg-color mr-5">
      <Drager :boundary="true" :is-grid="true"> 点我拖拽 </Drager>
      <Grid />
    </div>
    <div class="w-6/12 h-full bg-bg-color ml-5">
      <Drager :boundary="true" :is-grid="true" :grid-x="40" :grid-y="40">
        点我拖拽
      </Drager>
      <Grid :grid-x="40" :grid-y="40" />
    </div>
  </div>
</template>

<style scoped></style>
