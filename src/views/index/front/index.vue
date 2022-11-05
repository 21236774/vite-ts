<script setup lang="ts">
// 嵌套路由
import { NButton, NGrid, NGi } from 'naive-ui'
import { api } from '@/api/oderview'
// api()
</script>

<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4">
    <n-gi :span="3">
      <div class="h-400 bg-bg-color rounded-2xl p-21 box-border">
        <n-button type="info">按钮</n-button>
      </div>
    </n-gi>
    <n-gi>
      <div class="h-400 bg-bg-color rounded-2xl" />
    </n-gi>
  </n-grid>

  <n-grid :x-gap="12" :y-gap="12" :cols="4" class="mt-21">
    <n-gi>
      <div class="h-101 bg-bg-color rounded-2xl" />
    </n-gi>
    <n-gi>
      <div class="h-101 bg-bg-color rounded-2xl" />
    </n-gi>
    <n-gi>
      <div class="h-101 bg-bg-color rounded-2xl" />
    </n-gi>
    <n-gi>
      <div class="h-101 bg-bg-color rounded-2xl" />
    </n-gi>
  </n-grid>
</template>

<style>

</style>
