<script setup lang="ts">
import { NResult, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const go = () => {
  router.push({
    path: '/login',
    query: { redirect: router.currentRoute.value.path }
  })
}
</script>

<template>
  <div class="text-primary bg-success">自定义颜色</div>
  <div class="flex justify-center items-center h-full">
    <n-result
      status="404"
      title="404 资源不存在"
      description="生活总归带点荒谬"
    >
      <template #footer>
        <n-button type="primary" class="bg-success" @click="go"
          >页面不见了,找点乐子吧,去首页</n-button
        >
      </template>
    </n-result>
  </div>
</template>
