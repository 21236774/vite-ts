<script setup lang="ts">
import { ref, watch } from 'vue'
import { renderIcon } from '@/utils'
import { useI18n } from 'vue-i18n'
import {
  ColorPalette,
  PersonCircleOutline,
  LogOutOutline,
  LanguageOutline
} from '@vicons/ionicons5'
import { FullscreenOutlined } from '@vicons/antd'
import { useStoreTheme, userRoute, useTab, useStoreAuth } from '@/store'
import {
  NLayoutHeader,
  NButton,
  NAvatar,
  NDrawer,
  NIcon,
  NDropdown,
  NTooltip
} from 'naive-ui'
import type { DropdownOption } from 'naive-ui'
import type { ThemeColor } from '@/theme-pack'
import Mallki from '@/components/TextHoverEffect/index.vue'
import { useRouterPush } from '@/hooks'
import { useFullscreen } from '@vueuse/core'

const store = useStoreTheme()
const storeRoute = userRoute()
const storeTab = useTab()
const storeUath = useStoreAuth()
const { goLogout } = useRouterPush()
const { toggle } = useFullscreen()
const { t, locale } = useI18n()
const color = ref<string>(store.$state.color.replace(',0.2', ',0.8'))
const log: string = import.meta.env.VITE_LOGO
let theme: ThemeColor = 'theme'
const indexTheme = ref<number>(0)
const active = ref(false)

interface ModeTheme {
  label: string
  value: 'theme' | 'dark'
}

const popselectOptions = ref<ModeTheme[]>([])

const options = ref<DropdownOption[]>([])

const langOptions: DropdownOption[] = [
  {
    label: '中文',
    key: 'zh'
  },
  {
    label: 'English',
    key: 'en'
  }
]

// 初始设置一次颜色主题
store.setTheme(theme)
store.setThemeOverrides()

const update = () => {
  if (!indexTheme.value) indexTheme.value = 1
  else indexTheme.value = 0
  theme = popselectOptions.value[indexTheme.value].value as ThemeColor
  store.setTheme(theme)
  store.skinning()
}

const onSelect = (key: string | number, option: DropdownOption) => {
  if (key === 'logout') {
    goLogout()
    storeRoute.resetRoutes()
    storeTab.resetTab()
  }
}

const onLangSelect = (key: string) => {
  locale.value = key
  setSelect()
}

const setSelect = () => {
  popselectOptions.value = [
    {
      label: t('headers.darkTheme'),
      value: 'theme'
    },
    {
      label: t('headers.defaultTheme'),
      value: 'dark'
    }
  ]

  options.value = [
    {
      label: t('headers.userInfo'),
      key: 'profile',
      icon: renderIcon(PersonCircleOutline)
    },
    {
      label: t('headers.logOut'),
      key: 'logout',
      icon: renderIcon(LogOutOutline)
    }
  ]
}
setSelect()
watch(
  () => store.$state.color,
  (val) => {
    color.value = val.replace(',0.2', ',0.8')
  }
)

watch(
  () => store.$state.theme,
  (val) => {
    if (val !== popselectOptions.value[indexTheme.value].value) {
      indexTheme.value = val === 'dark' ? 1 : 0
      console.log(indexTheme.value)
    }
  }
)
</script>

<template>
  <n-layout-header
    class="flex justify-between px-5 h-50 leading-50 bg-bg-color color-text-color border-header"
  >
    <div class="logo" :style="{ '-webkit-text-stroke': `1px ${color}` }">
      {{ log }}
    </div>
    <div class="flex items-center">
      <mallki
        class="name mr-13"
        :text="`欢迎：${storeUath.userInfo?.userName || '用户'}`"
      />
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-button quaternary @click="update()">{{
            popselectOptions[indexTheme].label
          }}</n-button>
        </template>
        <span>{{ t('headers.themeMode') }}</span>
      </n-tooltip>
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-icon
            :component="FullscreenOutlined"
            class="cursor-pointer mr-4"
            style="width: 30px"
            :size="30"
            @click="toggle"
          />
        </template>
        <span>{{ t('headers.fullScreen') }}</span>
      </n-tooltip>
      <n-dropdown :options="langOptions" @select="onLangSelect">
        <n-icon
          :component="LanguageOutline"
          class="cursor-pointer mr-4"
          style="width: 30px"
          :size="30"
        />
      </n-dropdown>
      <n-dropdown :options="options" @select="onSelect">
        <span class="flex items-center cursor-pointer"
          ><n-avatar
            class="mx-4"
            round
            :size="40"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        /></span>
      </n-dropdown>
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-icon
            :component="ColorPalette"
            class="text-icon-color cursor-pointer"
            style="width: 40px"
            :size="40"
            @click="active = true"
          />
        </template>
        <span>{{ t('headers.systemTopic') }}</span>
      </n-tooltip>
    </div>
  </n-layout-header>
  <n-drawer v-model:show="active" :width="400" placement="right">
    <slot />
  </n-drawer>
</template>

<style>
.logo {
  font-family: '华文彩云';
  font-size: 30px;
  font-weight: bolder;
}

.border-header {
  border-bottom: 1px solid rgba(97, 95, 95, 0.1);
}
</style>
