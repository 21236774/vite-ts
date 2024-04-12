<script setup lang="ts">
import { ref, h, withModifiers, reactive } from 'vue'
import { NCard, NDataTable, NButton, useDialog } from 'naive-ui'
import markdownParser from '@/utils/markdown'
import UpdateArticle from './components/new.vue'
import moment from 'moment'
import { usePagination } from '@/hooks'
import { getUserArticle } from '@/api/article'
import { useStoreTheme } from '@/store'

type RowData = {
  remark: string
  title: string
  text: string
  date: string
  id?: number
}
const tableEdit = ['编辑', '删除']
type TableEdit = '编辑' | '删除'
const dialog = useDialog()
const store = useStoreTheme()
const columns: any[] = [
  {
    title: '标题',
    key: 'title'
  },
  {
    title: '内容',
    key: 'text',
    width: 500,
    ellipsis: {
      tooltip: false,
      lineClamp: 2
    }
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
  },
  {
    title: '操作',
    key: 'action',
    render(row: RowData) {
      const btns = tableEdit.map((el) => {
        return h(
          NButton,
          {
            size: 'small',
            type: el === '删除' ? 'error' : 'info',
            style: { marginRight: '10px' },
            onClick: withModifiers(() => {
              handleClick(row, el as TableEdit)
            }, ['stop'])
          },
          { default: () => el }
        )
      })
      return btns
    }
  }
]

const dataRef = ref([])
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
const { pagination } = usePagination(getData)
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

const editText = ref<'新增' | '编辑'>('新增')
const editShow = ref(false)
const editContent = reactive({
  title: '',
  content: '',
  remark: '',
  id: 0
})
const handleClick = (row: RowData, val: TableEdit) => {
  console.log(row, val)
  if (val === '编辑') {
    editContent.title = row.title
    editContent.content = row.text
    editContent.remark = row.remark
    editContent.id = row.id || 0
    editText.value = val
    editShow.value = true
  } else {
    // 删除
    dialog.warning({
      title: '警告',
      content: '你确定删除？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        console.log(222)
      }
    })
  }
}

const newArticleData = () => {
  editText.value = '新增'
  editShow.value = true
}
const handleChange = () => {
  getData()
  editShow.value = false
}
</script>
<template>
  <n-card title="文章列表">
    <x-button type="info" class="new-article-btn" @click="newArticleData"
      >新建文章</x-button
    >
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
    <div
      :class="`markdown-body w-650 ${store.theme === 'dark' ? '__dark' : ''}`"
    >
      <h1 class="mb-13">{{ rowItem?.title }}</h1>
      <div class="mb-21">
        <span
          :class="`row-item-user ${
            store.theme === 'dark' ? 'row-item-user-dark' : ''
          }`"
          >{{ rowItem?.user }}</span
        >
        <span class="ml-4 row-item-date">{{ rowItem?.date }}</span>
      </div>
      <div v-html="markdownText"></div>
    </div>
  </x-modal>
  <x-modal v-model:show="editShow">
    <UpdateArticle
      class="w-1200"
      :card-text="editText"
      :options="editContent"
      @handle="handleChange"
    />
  </x-modal>
</template>

<style lang="less">
.new-article-btn {
  position: absolute;
  top: 4px;
  right: 24px;
  margin-right: 0;
}
.row-item-user {
  color: #666;
  font-size: 14px;
}
.row-item-user-dark {
  color: #f1f1f1;
}
.row-item-date {
  color: #999;
  font-size: 14px;
}
</style>
