<script setup lang="ts">
// 这里直接用的$ref可以不用.value
import { watch } from 'vue'
import { NTabs, NTabPane } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { menuOptions } from '../menu'
import { useTab } from '@/store'

const message = useMessage()
const tabStore = useTab()
const menuList = $ref([])
const value = $ref('0')



const handleClose = (name: number) => {
  if (menuList.length === 1) {
    message.error('最后一个了')
    return
  }
  message.info('关掉 ' + name)
  const obj = menuList.find((v: any) => name === v.text)
  tabStore.delTabsList(obj.key)
  if (value === name) {
    value = menuList[menuList.length - 1].text
  }
}

watch(() => [tabStore.$state.tabsList, tabStore.$state.tabActive], (newVal) => {
  menuList = newVal[0]
  value = newVal[1]?.text
}, { deep: true, immediate: true })


</script>

<template>
  <n-tabs
    v-model:value="value"
    type="card"
    closable
    tab-style="min-width: 80px;"
    @close="handleClose"
  >
    <n-tab-pane v-for="panel in menuList" :key="panel.key" :name="panel.text" />
  </n-tabs>
</template>