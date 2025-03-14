<script setup lang="ts">
import {
  NButton,
  NCard,
  NInput,
  NSelect,
  useDialog,
  useMessage
} from 'naive-ui'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { onMounted, ref } from 'vue'
import { updateArticle } from '@/api/article'
import { getTags } from '@/api/category'

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
        id: '',
        tags: ''
      }
    }
  }
})
const emit = defineEmits(['handle'])
const selectVal = ref(null)
const selectOptions = ref([])
getTags().then((res: any) => {
  res.forEach((el: any) => {
    if (el.id) {
      const obj = {
        label: el.tagName,
        value: el.tagName,
        id: el.id
      }
      selectOptions.value.push(obj as never)
    }
  })
  if (propsData.cardText === '编辑') {
    selectVal.value = propsData.options.tags.split(',')
  }
})

const vditor = ref<Vditor | null>(null)
const dialog = useDialog()
const message = useMessage()
const title = ref(propsData.options.title)
const remark = ref(propsData.options.remark)
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
        if (!vditor.value) return
        const value = vditor!.value.getValue()
        const arr: string[] = []
        selectOptions.value.forEach((el: any) => {
          if (selectVal.value.includes(el.value as never)) {
            arr.push(el.id)
          }
        })
        const params = {
          title: title.value,
          text: value,
          remark: remark.value,
          tags: arr.join(',')
        }
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
    height: 520,
    after: () => {
      vditor.value!.setValue(propsData.options.content)
    }
  })
})
</script>
<template>
  <n-card :title="`${cardText}文章`">
    <div class="flex items-center">
      <p class="w-14">标题：</p>
      <n-input
        v-model:value="title"
        type="text"
        size="large"
        placeholder="标题"
      />
    </div>
    <div class="flex mt-5 items-center">
      <n-select
        v-model:value="selectVal"
        class="w-72 mr-5"
        size="large"
        placeholder="选择分类"
        multiple
        :options="selectOptions"
      />
      <p class="w-16">备注：</p>
      <n-input
        v-model:value="remark"
        type="text"
        size="large"
        placeholder="备注内容"
      />
    </div>
    <div id="vditor" class="mt-5" />
    <div class="mt-5 text-right">
      <n-button class="mr-5"> 保存到草稿箱 </n-button>
      <n-button type="info" @click="onSubmit"> 提交 </n-button>
    </div>
  </n-card>
</template>
