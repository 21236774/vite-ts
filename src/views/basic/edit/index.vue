<script setup lang="ts">
import { onMounted, ref } from 'vue'

const dom = ref(null)

onMounted(() => {
  console.log(dom)
})
</script>

<template>
  <div>
    <div ref="dom"></div>
    系统设置
    <div style="color: red">测试CI/CD流水线是否有效</div>
    <xdd-button type="success">成功按钮</xdd-button>
  </div>
</template>
