<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NCard, NDataTable } from 'naive-ui'
import markdownParser from '@/utils/markdown'
import moment from 'moment'
import { getUserArticle } from '@/api/article'
const dataRef = ref([])

type RowData = {
  remark: string
  title: string
  text: string
  date: string
}
const columns: any[] = [
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
    title: '发布人',
    key: 'user'
  },
  {
    title: '备注',
    key: 'remark'
  }
]
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10],
  pageCount: 1,
  itemCount: 1,
  onChange: (page: number) => {
    pagination.page = page
    getData()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getData()
  },
  prefix({ itemCount }) {
    return `Total is ${itemCount}.`
  }
})
const loadingRef = ref(true)
const getData = () => {
  getUserArticle({ page: pagination.page, limit: pagination.pageSize }).then(
    (res: any) => {
      res?.data.data.forEach((el: any) => {
        el.date = moment(el.date).format('YYYY-MM-DD HH:mm:ss')
      })
      dataRef.value = res?.data.data
      pagination.itemCount = res.data.total
      pagination.pageCount = res.data.current.totalPages
      console.log(pagination)
      loadingRef.value = false
    }
  )
}
getData()

const show = ref(false)
const rowItem = ref({})
const markdownText = ref('')
const rowProps = (row: RowData) => {
  return {
    onClick: () => {
      markdownText.value = markdownParser.render(row.text)
      rowItem.value = row
      show.value = true
    }
  }
}
</script>
<template>
  <n-card title="文章列表">
    <n-data-table
      :columns="columns"
      :remote="true"
      :data="dataRef"
      :row-props="rowProps"
      :pagination="pagination"
      :loading="loadingRef"
    />
  </n-card>
  <x-modal v-model:show="show">
    <div class="markdown-body w-650">
      <div class="mb-13">{{ rowItem.title }}</div>
      <div v-html="markdownText"></div>
    </div>
  </x-modal>
</template>
