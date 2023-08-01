<script setup lang="ts">
import LayoutMain from './layout-main/index.vue'
import LayoutSider from './layout-sider/index.vue'
import LayoutEdit from './layout-edit/index.vue'
import LayoutHeader from './layout-header/index.vue'
import LayoutTabs from './layout-tabs/index.vue'
import { useStoreAuth } from '@/store'
const authStore = useStoreAuth()
authStore.loginToken()
</script>

<template>
  <LayoutSider>
    <template #header>
      <LayoutHeader>
        <LayoutEdit />
      </LayoutHeader>
    </template>
    <template #tabs>
      <LayoutTabs />
    </template>
    <LayoutMain />
  </LayoutSider>
</template>
