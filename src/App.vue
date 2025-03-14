<script setup lang="ts">
import { NMessageProvider, NDialogProvider } from 'naive-ui'
</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <router-view />
    </n-dialog-provider>
  </n-message-provider>
</template>

<style>
@import url('./assets/styles/index.css');
html,
body {
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
li {
  list-style: none;
}
</style>
