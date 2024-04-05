<script setup>
import { ref } from 'vue'
import { NCard, NDataTable } from 'naive-ui'
import moment from 'moment'
import { getArticle } from '@/api/article'
const data = ref([])
const columns = [
  {
    title: '标题',
    key: 'title'
  },
  {
    title: '内容',
    key: 'text'
  },
  {
    title: '发布时间',
    key: 'date'
  },
  {
    title: '备注',
    key: 'remark'
  }
]
getArticle().then((res) => {
  res.data.forEach((el) => {
    el.date = moment(el.date).format('YYYY-MM-DD HH:mm:ss')
  })
  data.value = res?.data
})
</script>
<template>
  <n-card title="文章列表">
    <n-data-table :columns="columns" :data="data" :bordered="false" />
  </n-card>
</template>
