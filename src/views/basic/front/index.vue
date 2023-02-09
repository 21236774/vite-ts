<script setup lang="ts">
// 嵌套路由
import { NButton, NGrid, NGi, NTimeline, NTimelineItem, NCard } from 'naive-ui'
import { api } from '@/api/oderview'
import { useEcharts } from "@/hooks";
import { lineData, barOptions } from "./config";
import Table from "./components/Table/index.vue";

const { domRef } = useEcharts(lineData)
const { domRef: barRef } = useEcharts(barOptions)
api()
</script>

<template>
  <!-- 先偷懒，后续在抽 -->
  <n-grid :x-gap="12" :y-gap="12" :cols="4">
    <n-gi :span="3">
      <div class="h-400 bg-bg-color rounded-2xl p-21 box-border flex">
        <div class="mr-13 flex flex-col justify-between">
          <n-button type="info" v-has="['admin', 'xdd']">大丘丘病了</n-button>
          <n-button type="primary" v-has="['admin', 'user']">二丘丘瞧</n-button>
          <n-button type="info" v-has="['admin', 'xdd']">三丘丘采药</n-button>
          <n-button type="primary" v-has="['admin', 'user']">四丘丘熬</n-button>
          <n-button type="info" v-has="['admin', 'xdd']">五丘丘死了</n-button>
          <n-button type="primary" v-has="['admin', 'user']">六丘丘抬</n-button>
          <n-button type="info" v-has="['admin', 'xdd']">七丘丘挖坑</n-button>
          <n-button type="primary" v-has="['admin', 'user']">八丘丘埋</n-button>
        </div>
        <div ref="domRef" class="w-full h-full" />
      </div>
    </n-gi>
    <n-gi>
      <div class="h-400 bg-bg-color rounded-2xl p-21">
        <div ref="barRef" class="w-full h-full" />
      </div>
    </n-gi>
  </n-grid>

  <n-grid :x-gap="12" :y-gap="12" :cols="4" class="mt-21">
    <n-gi><div class="h-101 bg-bg-color rounded-2xl box-1 box-color" /></n-gi>
    <n-gi><div class="h-101 bg-bg-color rounded-2xl box-2 box-color" /></n-gi>
    <n-gi><div class="h-101 bg-bg-color rounded-2xl box-3 box-color" /></n-gi>
    <n-gi><div class="h-101 bg-bg-color rounded-2xl box-4 box-color" /></n-gi>
  </n-grid>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" class="mt-21">
    <n-gi>
      <div class="h-400 bg-bg-color rounded-2xl px-21">
        <n-card title="卡池复刻" :bordered="false" class="bg-bg-color">
          <n-timeline>
            <n-timeline-item
              type="success"
              title="夜阑 | 胡桃"
              content="3.4下半卡池"
              time="2023-02-02 18:00"
            />
            <n-timeline-item 
              type="error"
              title="艾尔海森 | 魈"
              content="3.4上半卡池"
              time="2023-01-08 18:00"
            />
            <n-timeline-item
              type="warning"
              title="神里凌人 | 雷电将军"
              content="3.4下半卡池"
              time="2022-12-22 18:00"
            />
            <n-timeline-item
              type="info"
              title="流浪者散兵 | 荒泷一斗"
              content="3.3上半卡池"
              time="2022-12-07 18:00"
              line-type="dashed"
            />
          </n-timeline>
        </n-card>
      </div>
    </n-gi>
    <n-gi :span="3">
      <div class="h-400 bg-bg-color rounded-2xl p-21 box-border flex"><Table /></div>
    </n-gi>
  </n-grid>
</template>

<style scoped>
.box-color {
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
}
.box-1:hover,.box-2:hover,.box-3:hover,.box-4:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}
.box-1 {
  background-image: linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%);
}
.box-2 {
  background-image: linear-gradient(to right, #D66D75 0%, #E29587  51%, #D66D75  100%);
}
.box-3 {
  background-image: linear-gradient(to right, #6190E8 0%, #A7BFE8  51%, #6190E8  100%);
}
.box-4 {
  background-image: linear-gradient(to right, #F09819 0%, #EDDE5D  51%, #F09819  100%);
}
</style>
