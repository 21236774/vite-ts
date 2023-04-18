<script setup lang="ts">
import { ref, h, defineComponent, nextTick } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NInput, NDataTable } from 'naive-ui'

type RowData = {
  key: number
  name: string
  age: string
  address: string
}

const createData = (): RowData[] => [
  {
    key: 0,
    name: 'John Brown',
    age: '32',
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: '42',
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 4,
    name: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 4,
    name: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park'
  }
]

const ShowOrEdit = defineComponent({
  props: {
    value: [String, Number],
    onUpdateValue: [Function, Array]
  },
  setup(props) {
    const isEdit = ref(false)
    const inputRef = ref(null)
    const inputValue = ref(props.value)
    function handleOnClick() {
      isEdit.value = true
      nextTick(() => {
        inputRef.value.focus()
      })
    }
    function handleChange() {
      props.onUpdateValue(inputValue.value)
      isEdit.value = false
    }
    return () =>
      h(
        'div',
        {
          style: 'min-height: 22px',
          onClick: handleOnClick
        },
        isEdit.value
          ? h(NInput, {
              ref: inputRef,
              value: inputValue.value,
              onUpdateValue: (v) => {
                inputValue.value = v
              },
              onChange: handleChange,
              onBlur: handleChange
            })
          : props.value
      )
  }
})

const createColumns = (): DataTableColumns<RowData> => [
  {
    title: 'Name',
    key: 'name',
    render(row, index) {
      return h(ShowOrEdit, {
        value: row.name,
        onUpdateValue(v: string) {
          data.value[index].name = v
        }
      })
    }
  },
  {
    title: 'Age',
    key: 'age',
    render(row, index) {
      return h(ShowOrEdit, {
        value: row.age,
        onUpdateValue(v: string) {
          data.value[index].age = v
        }
      })
    }
  },
  {
    title: 'Address',
    key: 'address',
    render(row, index) {
      return h(ShowOrEdit, {
        value: row.address,
        onUpdateValue(v: string) {
          data.value[index].address = v
        }
      })
    }
  }
]
const columns = createColumns()
const data = ref(createData())
</script>

<template>
  <n-data-table
    :key="(row) => row.key"
    :columns="columns"
    :data="data"
    :style="{ height: `360px` }"
  />
</template>
