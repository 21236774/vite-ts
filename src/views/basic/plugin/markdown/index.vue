<script setup lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ref, onMounted } from 'vue'
const vditor = ref<Vditor | null>(null)

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    after: () => {
      vditor.value!.setValue('')
    }
  })
})
</script>

<template>
  <div class="w-full h-auto bg-bg-color rounded-2xl p-21 box-border mb-13">
    <div id="vditor" style="min-height: 600px" />
  </div>
</template>
