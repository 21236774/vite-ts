<script setup lang="ts">
import { watch, ref } from 'vue'
import { NTabs, NTab, NIcon, NTooltip } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { useTab, useApp } from '@/store'
import { type TabActive } from '@/store'
import { useRouterPush } from '@/hooks'
import { Refresh } from '@vicons/ionicons5'

const message = useMessage()
const { routerPush } = useRouterPush()
const tabStore = useTab()
const appStore = useApp()
// 这里直接用的$ref可以不用.value
// const menuList = $ref([])
// const value = $ref('0')
const menuList = ref<TabActive[]>([])
const value = ref(0)

// 选中某个tabs
const updateChange = (val: string | number) => {
  const obj = menuList.value.find(
    (item: { text: string | number }) => item.text === val
  )
  tabStore.updateTabs(obj)
  if (obj) routerPush(obj.path)
}

// 关闭单个tabs
const handleClose = (name: number) => {
  if (menuList.value.length === 1) {
    message.error('最后一个了')
    return
  }
  message.info('关掉 ' + name)
  const obj = menuList.value.find((v: any) => name === v.text)
  const remainArr = menuList.value.filter((v: any) => name !== v.text)
  if (obj) tabStore.delTabsList(obj?.key)
  if (value.value === name) {
    const remainItem = remainArr[remainArr.length - 1]
    routerPush(remainItem.path)
  }
}

watch(
  () => [tabStore.$state.tabsList, tabStore.$state.tabActive],
  (newVal) => {
    menuList.value = newVal?.[0] as TabActive[]
    // @ts-ignore
    value.value = newVal[1]?.text
  },
  { deep: true, immediate: true }
)

// 刷新
const onRefresh = () => {
  appStore.onRefresh(500)
}
</script>

<template>
  <div class="relative z-10">
    <n-tabs
      v-model:value="value"
      type="card"
      closable
      tab-style="min-width: 80px;"
      @update:value="updateChange"
      @close="handleClose"
    >
      <n-tab
        v-for="panel in menuList"
        v-show="panel"
        :key="panel.key"
        :name="panel.text"
      />
    </n-tabs>
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-icon
          :component="Refresh"
          size="30"
          class="text-icon-color absolute top-2 right-21"
          @click="onRefresh"
        />
      </template>
      <span>重新加载</span>
    </n-tooltip>
  </div>
</template>
