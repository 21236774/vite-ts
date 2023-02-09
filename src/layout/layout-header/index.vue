<script setup lang="ts">
import { ref, watch } from 'vue'
import { renderIcon } from '@/utils'
import { ColorPalette, PersonCircleOutline, LogOutOutline } from '@vicons/ionicons5'
import { FullscreenOutlined } from '@vicons/antd'
import { useStoreTheme, userRoute, useTab } from '@/store'
import { NLayoutHeader,NButton,NAvatar,NDrawer,NIcon,NDropdown, NTooltip } from 'naive-ui'
import type { DropdownOption } from 'naive-ui'
import type { ThemeColor } from '@/theme-pack'
import { useRouterPush } from '@/hooks'
import { useFullscreen } from '@vueuse/core'

const store = useStoreTheme()
const storeRoute = userRoute()
const storeTab = useTab()
const { goLogout } = useRouterPush()
const { toggle } = useFullscreen()
const color = ref<string>(store.$state.color.replace(',0.2', ',0.8'))
const log: string = import.meta.env.VITE_LOGO
let theme: ThemeColor = 'default'
const indexTheme = ref<number>(0)
const active = ref(false)

const popselectOptions = [
  {
    label: '默认主题',
    value: 'default'
  },
  {
    label: '暗黑主题',
    value: 'dark'
  }
]

const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(PersonCircleOutline)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOutOutline)
  }
]

// 初始设置一次颜色主题
store.setTheme(theme)
store.setThemeOverrides()

const update = () => {
  if(!indexTheme.value) indexTheme.value = 1
  else indexTheme.value = 0
  theme = popselectOptions[indexTheme.value].value as ThemeColor
  store.setTheme(theme)
  store.skinning()
}

const onSelect = (key: string | number, option: DropdownOption) => {
  if(key === 'logout') {
    goLogout()
    storeRoute.resetRoutes()
    storeTab.resetTab()
  }
}

watch(() => store.$state.color, (val) => {
  color.value = val.replace(',0.2', ',0.8')
})

watch(() => store.$state.theme, (val) => {
  if(val !== popselectOptions[indexTheme.value].value) {
    indexTheme.value = val === 'dark' ? 1 : 0
    console.log(indexTheme.value)
  }
})


</script>

<template>
  <n-layout-header class="flex justify-between px-5 h-50 leading-50 bg-bg-color color-text-color border-header">
    <div class="logo" :style="{ '-webkit-text-stroke': `1px ${color}` }">{{ log }}</div>
    <div class="flex items-center">
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-button quaternary @click="update()">{{ popselectOptions[indexTheme].label }}</n-button>
        </template>
        <span>主题模式</span>
      </n-tooltip>
      <n-dropdown :options="options" @Select="onSelect">
        <span class="flex items-center"><n-avatar class="mx-4" round :size="40" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"/></span>
      </n-dropdown>
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-icon :component="FullscreenOutlined" @click="toggle" class="cursor-pointer mr-4" style="width: 30px" :size="30" />
        </template>
        <span>全屏</span>
      </n-tooltip>
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-icon :component="ColorPalette" class="text-icon-color cursor-pointer" style="width: 40px;" :size="40" @click="active = true" />
        </template>
        <span>系统主题</span>
      </n-tooltip>
    </div>
  </n-layout-header>
  <n-drawer v-model:show="active" :width="400" placement="right">
    <slot />
  </n-drawer>
</template>

<style>
  .logo {
    font-family: "华文彩云";
    font-size: 30px;
    font-weight: bolder;
  }
  .border-header {
    border-bottom: 1px solid rgba(97, 95, 95, 0.1);
  }
</style>
