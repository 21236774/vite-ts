<template>
  <div class="u-select">
    <ul class="bg-blue w-200">
      <li v-for="item in list" :key="item.value" class="w-100 text-16">
        <div>{{ item.title }}</div>
        <div v-if="item?.children" class="u-select-children pl-12">
          <u-select :list="item.children"></u-select>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: 'USelect'
})
const value = ref("1");

const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return [
        {
          title: "苹果",
          value: "1",
        },
        {
          title: "香蕉",
          value: "2",
        },
        {
          title: "零食",
          value: "3",
          children: [
            {
              title: "辣条",
              value: "3-1",
            },
            {
              title: "坚果",
              value: "3-2",
            },
          ],
        },
        {
          title: "西瓜",
          value: "4",
        }
      ];
    },
  },
});

</script>
