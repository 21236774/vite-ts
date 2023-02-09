<script setup lang="ts">
import { ref, reactive } from 'vue'
const arr = reactive([ref(666)])
 console.log(arr[0].value);

</script>

<template>
  <div>死亡如风，常伴吾声</div>
  <div>MORE+</div>
  <div>{{ arr[0] }}</div>
  <ul>
    <li>
      <p>1111111</p>
      <span>22</span>
    </li>
  </ul>
</template>