<script setup lang="ts">
import layout from '@/layout/index.vue'
import { useRouter } from 'vue-router'
import { getCookie } from '@/hooks'

const router = useRouter()
const page = router.currentRoute.value

const user = getCookie('token')

if(user) router.push({ name: 'index-front' })
else router.push({ name: 'login' })


</script>

<template>
  <layout />
</template>