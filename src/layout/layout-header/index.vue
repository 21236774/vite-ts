<script setup lang="ts">
import { ref, watch } from 'vue'
import { ColorPalette } from '@vicons/ionicons5'
import { useStoreTheme } from '@/store'
import {
  NLayoutHeader,
  NButton,
  NAvatar,
  NDrawer,
  NIcon
} from 'naive-ui'
import type { ThemeColor } from '@/theme-pack'

const store = useStoreTheme()
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
      <n-button quaternary @click="update()">{{ popselectOptions[indexTheme].label }}</n-button>
      <span class="flex items-center"><n-avatar class="mx-4" round :size="40" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"/></span>
       <n-icon :component="ColorPalette" class="text-icon-color cursor-pointer" style="width: 40px;" :size="40" @click="active = true" />
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
