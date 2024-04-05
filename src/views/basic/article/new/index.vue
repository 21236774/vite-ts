<script setup lang="ts">
import { NCard, NButton, NInput, useDialog, useMessage } from 'naive-ui'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { updateArticle } from '@/api/article'
const vditor = ref<Vditor | null>(null)
const title = ref('')

const router = useRouter()
const dialog = useDialog()
const message = useMessage()

const onSubmit = () => {
  if (!title.value || !vditor?.value) {
    message.error('请完善内容后再发布吧！')
    return
  }
  if (vditor.value) {
    dialog.success({
      title: '发布',
      content: '您确认发布新文章吗？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        const value = vditor!.value.getValue()
        updateArticle({ title: title.value, text: value }).then((res: any) => {
          message.success(res.msg)
        })
      }
    })
  }
}

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    after: () => {
      vditor.value!.setValue('')
    }
  })
})

router.beforeEach((to, from, next) => {
  if (vditor?.value) {
    const value = vditor.value.getValue()
    if (value.trim() !== '' || title.value !== '') {
      dialog.warning({
        title: '警告',
        content: '您有内容未保存，您确定离开吗？',
        positiveText: '确定',
        negativeText: '不确定',
        onPositiveClick: () => {
          vditor.value!.setValue('')
          next()
        }
      })
    } else {
      next()
    }
    return
  }
  next()
})
</script>
<template>
  <n-card title="新增文章">
    <n-input
      v-model:value="title"
      type="text"
      size="large"
      placeholder="标题"
    />
    <div id="vditor" style="min-height: 600px" class="mt-5" />
    <div class="mt-5 text-right">
      <n-button class="mr-5"> 保存到草稿箱 </n-button>
      <n-button type="info" @click="onSubmit"> 提交 </n-button>
    </div>
  </n-card>
</template>
