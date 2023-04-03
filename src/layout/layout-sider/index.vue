
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
// import { storeToRefs } from 'pinia' // 它将为任何响应式属性创建 refs
import { useRouter } from 'vue-router'
import { useStoreTheme, useTab, userRoute } from '@/store'
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NConfigProvider,
  useMessage
} from 'naive-ui'
import { routerFlat } from '@/utils'
import type { MenuOption } from 'naive-ui'

const store = useStoreTheme()
const tabStore = useTab()
const routeStore = userRoute()
// const { tabActive } = tabStore // 结构会丢失相应数据，因为store是一个reactive
// const { tabActive } = storeToRefs(tabStore)

const menuOptions = ref(routeStore.menu)

const router = useRouter()
const themeOverrides = ref(store.$state.themeOverrides)
const theme = ref(store.$state.darkTheme)
const siderWidth = ref('240px')
const path = router.currentRoute.value.path

// 全局挂载消息方法，使得能直接在ts当中使用
window.messageApi = useMessage()

const value = ref(path.split('/')[1] || tabStore.$state.tabActive?.key)
const tabData = routerFlat(routeStore.menu as AuthRoute.Route[])

// @ts-ignore 默认初始化添加一次tab
tabStore.updateTabs(tabData.find(el => el.path === path))

// 点击选中菜单回调
const menuChange = (key: string, item: MenuOption) => {
  const pathUrl = item.path as string
  const text = item.text as string
  tabStore.updateTabs({ key, text, path: pathUrl })
}

// 监听store中的变化改变暗黑模式
watch(() => store.$state.darkTheme, (val) => {
  theme.value = val
})
// 监听主题颜色，改变对应的主题
watch(() => store.$state.themeOverrides, (val) => {
  themeOverrides.value = val
})

// 控制menu选中
watch(() => tabStore.$state.tabActive, (val) => {
  value.value = val?.key
}, { deep: true, immediate: true })

const collapsed = (flag: boolean) => {
  if(flag) siderWidth.value = '64px'
  else siderWidth.value = '240px'
}

const siderStyle = computed(() => {
  return { paddingLeft: siderWidth.value }
})

</script>

<template>
  <n-config-provider value="hear-the-wind-sing" :theme="theme" :theme-overrides="themeOverrides" class="h-full">
    <n-layout class="h-full">
      <slot name="header" />
      <n-layout has-sider style="height: calc(100% - 50px);" class="bg-global-color">
        <n-layout-sider
          show-trigger
          class="h-full bg-bg-color"
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          @update:collapsed="collapsed"
        >
          <n-menu
            :default-value="value"
            :value="value"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            @update:value="menuChange"
          />
        </n-layout-sider>
        <n-layout class="color-text-color">
          <div class="bg-bg-color fixed shadow w-full left-0 layout-and" :style="siderStyle">
            <slot name="tabs"></slot>
          </div>
          <div class="m-21 mt-50">
            <slot />
          </div>
        </n-layout>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style>
.n-menu-item-content-header {
  text-align: left;
  margin-left: 10px;
}
.layout-and {
  transition: padding-left 0.4s;
}
</style>

