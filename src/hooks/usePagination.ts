import { reactive } from 'vue'

export const usePagination = (updateCallbakc: Function) => {
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [5, 10],
    pageCount: 1,
    itemCount: 1,
    onChange: (page: number) => {
      pagination.page = page
      updateCallbakc()
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize
      pagination.page = 1
      updateCallbakc()
    },
    prefix({ itemCount }: any) {
      return `总条数 ${itemCount} 条`
    }
  })

  return {
    pagination
  }
}
