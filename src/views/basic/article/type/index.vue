<script setup lang="ts">
import { NButton, NCard, NDataTable, NTag } from 'naive-ui'
import { getTags } from '@/api/category'
import { h, ref, withModifiers } from 'vue'

const tableEdit = ['查看', '编辑', '删除']
type TableEdit = '查看' | '编辑' | '删除'
const tableEditBtn = {
  查看: 'info',
  编辑: 'warning',
  删除: 'error'
}
const columns = [
  {
    title: '名称',
    key: 'tagName',
    render(row: any) {
      return h(
        NTag,
        {
          style: {
            marginRight: '6px'
          },
          type: 'info',
          bordered: false
        },
        {
          default: () => row.tagName
        }
      )
    }
  },
  {
    title: '发布时间',
    key: 'cTime'
  },
  {
    title: '发布时间',
    key: 'uTime'
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    render(row: any) {
      let editArr = JSON.parse(JSON.stringify(tableEdit))
      const btns = editArr.map((el: TableEdit) => {
        return h(
          NButton,
          {
            size: 'small',
            type: tableEditBtn[el],
            style: { marginRight: '10px' }
          },
          { default: () => el }
        )
      })
      return btns
    }
  }
]
const tableData = ref([])
getTags().then((res: any) => {
  tableData.value = res
})
</script>

<template>
  <n-card title="分类管理">
    <n-data-table :columns="columns" :data="tableData" :bordered="false" />
  </n-card>
</template>

<style scoped></style>
