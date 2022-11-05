<script setup lang="ts">
import LayoutMain from './layout-main/index.vue'
import LayoutSider from './layout-sider/index.vue'
import LayoutEdit from './layout-edit/index.vue'
import LayoutHeader from './layout-header/index.vue'
import LayoutBookmark from './layout-bookmark/index.vue'
</script>

<template>
  <LayoutSider>
    <template #header>
      <LayoutHeader>
        <LayoutEdit/>
      </LayoutHeader>
    </template>
    <template #tabs>
      <LayoutBookmark/>
    </template>
    <LayoutMain/>
  </LayoutSider>
</template>
