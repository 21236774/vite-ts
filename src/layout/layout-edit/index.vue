<script setup lang="ts">
// 设置主题颜色
import { NDrawerContent, NDivider, NSwitch, NIcon } from 'naive-ui'
import { Moon, Umbrella } from '@vicons/ionicons5'
import { ref, CSSProperties } from 'vue'
import { themeColorList } from '@/theme-pack'
import { useStoreTheme } from '@/store'

const store = useStoreTheme()
const title = ref('主题配置')
const switchValue = ref<boolean>(store.$state.theme === 'dark' ? true : false)
const colorActive = ref(store.$state.color.replace(',0.2', ',100'))

const setColor = (color: string) => {
  colorActive.value = color
  const value = color.replace(',100', ',0.2')
  store.setThemeOverrides(value)
}

const railStyle = () => {
  const style: CSSProperties = {
    background: '#000e1c'
  }
  return style
}

const switchUpdate = (value: boolean) => {
  if (value) store.setTheme('dark')
  else store.setTheme('theme')
  store.skinning()
}
</script>

<template>
  <n-drawer-content :title="title" class="color-text-color bg-modal-color">
    <n-divider>主题模式</n-divider>
    <div class="flex justify-between">
      <span>深色主题</span>
      <n-switch
        v-model:value="switchValue"
        :rail-style="railStyle"
        @update:value="switchUpdate"
      >
        <template #checked>
          <n-icon :component="Umbrella" class="text-icon-color" />
        </template>
        <template #unchecked>
          <n-icon :component="Moon" class="text-icon-color" />
        </template>
      </n-switch>
    </div>
    <n-divider>系统主题</n-divider>
    <ul class="flex flex-wrap">
      <li
        v-for="item in themeColorList"
        :key="item"
        :class="[
          'w-21 h-21 mr-21 mb-21 cursor-pointer',
          colorActive === item ? 'li-active' : ''
        ]"
        :style="{ background: item }"
        @click="setColor(item)"
      ></li>
    </ul>
  </n-drawer-content>
</template>

<style scoped>
.li-active:before {
  content: '\2714';
  color: #fff;
}
</style>
