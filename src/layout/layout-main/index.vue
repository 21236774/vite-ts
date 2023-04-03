<script setup lang="ts">
import { useApp } from "@/store"
const appStore = useApp()
</script>

<template>
  <router-view v-if="appStore.refreshFlag" />
</template>
