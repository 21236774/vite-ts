<template>
  <MarsMap
    :url="configUrl"
    :options="options"
    map-key="test"
    @onload="marsOnload"
  />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import MarsMap from '@/components/MapGis/index.vue'
const configUrl = ref('config/config.json')

const instance = getCurrentInstance()
const mars3d = instance?.appContext.config.globalProperties.mars3d
const options = {
  scene: {
    center: {
      heading: 0,
      pitch: -90, // 视角
      roll: 0,
      lat: 22.64,
      lng: 114.17,
      alt: 135000 // 高度
    }
  }
}
const marsOnload = (map: any) => {
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 2.在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event: any) {
    console.log('监听layer，单击了矢量对象', event)
  })
  graphicLayer.on(mars3d.EventType.mouseOver, function (event: any) {
    console.log('监听layer，鼠标移入了矢量对象', event)
  })
  graphicLayer.on(mars3d.EventType.mouseOut, function (event: any) {
    console.log('监听layer，鼠标移出了矢量对象', event)
  })

  // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  graphicLayer.bindPopup('我是layer上绑定的Popup', {
    anchor: [0, -10]
  })

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  graphicLayer.bindContextMenu([
    {
      text: '删除对象',
      iconCls: 'fa fa-trash-o',
      callback: function (e: any) {
        const graphic = e.graphic
        if (graphic) {
          graphicLayer.removeGraphic(graphic)
        }
      }
    }
  ])
}
</script>

<style></style>
