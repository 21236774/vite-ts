<template>
  <div id="container"></div>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import { shallowRef, onMounted } from 'vue'
const map = shallowRef(null)

const initMap = () => {
  AMapLoader.load({
    key: '87f2ba52a0e234f76ab62f84172582df', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map.value = new AMap.Map('container', {
        //设置地图容器id
        viewMode: '3D', //是否为3D地图模式
        zoom: 5, //初始化地图级别
        center: [105.602725, 37.076636] //初始化地图中心点位置
      })
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>
