<script setup lang="ts">
import { NCard, NButton, NInput, useDialog, useMessage } from 'naive-ui'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ref, onMounted } from 'vue'
import { updateArticle } from '@/api/article'
const propsData = defineProps({
  cardText: {
    type: String,
    default: '新增'
  },
  options: {
    type: Object,
    default: () => {
      return {
        title: '',
        content: '',
        remark: '',
        id: ''
      }
    }
  }
})
const emit = defineEmits(['handle'])

const vditor = ref<Vditor | null>(null)
const dialog = useDialog()
const message = useMessage()
const title = ref(propsData.options.title)
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
        const params = { title: title.value, text: value }
        if (propsData.options.id !== '') params.id = propsData.options.id
        updateArticle(params).then((res: any) => {
          emit('handle')
          message.success(res.msg)
        })
      }
    })
  }
}

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    after: () => {
      vditor.value!.setValue(propsData.options.content)
    }
  })
})
</script>
<template>
  <n-card :title="`${cardText}文章`">
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
