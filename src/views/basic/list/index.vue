<script setup lang="ts">
import Mallki from '@/components/TextHoverEffect/index.vue'
import { useI18n } from 'vue-i18n'
import { NGrid, NGi } from 'naive-ui'
const { locale } = useI18n()

let name = 'xdd',
  age = 18,
  money = 0
let msg = `${name}今年${age},存款${money}元`
console.log(msg)
let msgTitle = ''
const effect = () => (msgTitle = `${name}今年${age},存款${money}元`)

const arr = new Set()
// 跟踪
const track = () => {
  arr.add(effect)
}

const trigger = () => {
  arr.forEach((el) => el())
}

const reactive = (target) => {
  const handler = {
    get(target, key, receiver) {},
    set(target, key, value) {}
  }
}

track()
money = 300
trigger()
console.log('msgTitle: ', msgTitle)
money = 600
trigger()

console.log('msgTitle: ', msgTitle)
</script>

<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4">
    <n-gi :span="2">
      <div class="h-400 bg-bg-color rounded-2xl p-21 box-border">
        <mallki class="name" text="迁徒-admin" />
        <div>死亡如风，常伴吾声</div>
        <div>{{ msgTitle }}</div>
        <div class="back">
          <div class="box"></div>
        </div>
      </div>
    </n-gi>
    <n-gi :span="2">
      <div class="h-400 bg-bg-color rounded-2xl p-21 box-border"></div>
    </n-gi>
  </n-grid>
</template>

<style lang="less">
.box {
  width: 100px;
  height: 100px;
  margin-left: 50px;
  background-color: rgba(89, 89, 89, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
  -webkit-box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
  border-radius: 13px;
  -webkit-border-radius: 13px;
  color: rgb(128, 128, 128);
}

.back {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #ffb566, #ff6677);
}
</style>
