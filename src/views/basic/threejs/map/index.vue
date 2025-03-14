<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import * as d3 from 'd3'
import {
  lineDraw,
  getBoundBox,
  calcUv2,
  controlsFn,
  createLabel,
  createCss3dRender
} from '@/utils/threejs'
import { drawExtrudeMesh, addEventMap, setPointAndTip } from './hooks'
import { circleAt } from './hooks/animation'
import { InteractionManager } from 'three.interactive'

const defaultColor = '#F69F47'
const activeColor = '#F9C978'
const d3Center = [112.271301, 30.987527]

const props = defineProps({
  id: {
    type: [Number, String],
    default: 1
  },
  url: {
    type: String,
    default: './img/wangxiaomei.jpg'
  },
  isGrid: {
    type: Boolean,
    default: false
  }
})

const scene = new THREE.Scene() // 创建场景
let camera = null // 创建相机
let addPointFn = null
let removePointFn = null
const renderer = new THREE.WebGLRenderer({ antialias: true }) // 创建渲染器
renderer.setClearAlpha(0)
// 设置点光源
const setPointLight = (scene) => {
  let sun = new THREE.AmbientLight(0xffffff, 2)
  scene.add(sun)
  // 方向光
  let directionalLight = new THREE.DirectionalLight(0xffffff, 4)
  directionalLight.position.set(0, 0, 8)
  directionalLight.castShadow = true
  directionalLight.shadow.radius = 20
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024
  scene.add(directionalLight)
}

onMounted(() => {
  const container = document.getElementById('canvas')
  const css3dRender = createCss3dRender(container)
  // scene.background = new THREE.Color(0xbfe3dd)
  camera = new THREE.PerspectiveCamera(
    10,
    container?.offsetWidth / container?.offsetHeight || 0,
    10,
    1000
  )
  camera.position.set(0, -50, 70) // 举例，设置相机的位置
  camera.lookAt(0, 0, 0)
  // const axes = new THREE.AxesHelper(700)
  // scene.add(axes)
  const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
  )
  setPointLight(scene)
  circleAt(scene)

  // 请求湖北数据
  const loader = new THREE.FileLoader()
  loader.load(
    'https://geo.datav.aliyun.com/areas_v3/bound/420000_full.json',
    (data) => {
      const jsondata = JSON.parse(data)
      operationData(jsondata)
    }
  )

  const projection = d3.geoMercator().center(d3Center).translate([0, 0]) // 坐标转换，设置湖北中心点
  const map = new THREE.Group()

  // 解析数据
  function operationData(jsondata) {
    // 全国信息
    const features = jsondata.features
    const regionList = [] // 区域数据
    features.forEach((feature) => {
      // 单个省份
      let { name, centroid = [], adcode } = feature.properties
      const group = new THREE.Group()
      regionList.push(feature.properties)
      group.uuid = 'group-' + adcode
      const groupLine = new THREE.Group()
      const [x, y] = d3
        .geoMercator()
        .center(d3Center)
        .scale(150)
        .translate([-1.2, -0.2])(centroid)
      // label 市文字
      const nameLabel = createLabel(
        `<span>${name}</span><span class="hidden-text-label">${name}</span>`,
        'map-label',
        new THREE.Vector3(x, -y, 1.1)
      )
      // 地址
      const coordinates = feature.geometry
      group.userData = feature.properties // 存储当前数据
      if (feature.geometry.type === 'MultiPolygon') {
        // 多个，多边形
        coordinates.coordinates.forEach((coordinate) => {
          // coordinate 多边形数据
          coordinate.forEach((rows) => {
            const mesh = drawExtrudeMesh(
              rows,
              feature.properties,
              projection,
              defaultColor
            )
            const line = lineDraw(rows, '#FDECA0', projection)
            groupLine.add(line)
            group.add(mesh)
          })
        })
      }
      // map.add(groupLine)
      group.add(nameLabel)
      group.add(groupLine) // 全部添加一组执行，动画就是一起的
      map.add(group)
    })
    scene.add(map)
    const { addPointTip, removePointTip } = setPointAndTip(
      scene,
      interactionManager,
      regionList,
      d3Center
    )
    addPointFn = addPointTip
    removePointFn = removePointTip
    // scene.add(pointArr)
    // 先隐藏，不然默认都显示

    setTimeout(() => {
      const arr = document.getElementsByClassName('map-label') || []
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.visibility = 'visible'
      }
      // addPointTip()
    }, 1000)

    // 处理整个背景贴图
    const { boxSize, box3 } = getBoundBox(map)
    const elementData = []
    map.children.forEach((group) => {
      group.children.map((mesh) => {
        if (mesh.type === 'Mesh') {
          elementData.push(mesh)
          calcUv2(mesh.geometry, boxSize.x, boxSize.y, box3.min.x, box3.min.y)
        }
      })
    })
    addEventMap(elementData, activeColor, map, interactionManager)
    animate(interactionManager)
  }
  function animate() {
    requestAnimationFrame(animate)
    interactionManager && interactionManager.update()
    css3dRender.render(scene, camera)
    renderer.render(scene, camera)
  }
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)
  controlsFn(camera, scene, renderer)
})
const addPoint = (flag) => {
  if (flag) addPointFn()
  else removePointFn()
}
</script>
<template>
  <div class="flex" style="width: 100%; height: 800px">
    <div id="canvas" class="w-full h-full relative"></div>
    <button @click="addPoint(1)">添加落点</button>
    <button @click="addPoint(0)">删除落点</button>
  </div>
</template>

<style lang="scss">
.map-label {
  color: #fff;
  font-size: 16px;
  background: #ff013c;
  white-space: nowrap;
  border: 0;
  color: #fff;
  position: relative;
  z-index: 22;
  span {
    position: absolute;
    z-index: 2;
    background: #ff013c;
    -webkit-clip-path: polygon(
      100% 0%,
      100% 51%,
      100% 100%,
      12% 100%,
      0 59%,
      0 1%
    );
    padding: 4px 8px;
    clip-path: polygon(100% 0%, 100% 51%, 100% 100%, 12% 100%, 0 59%, 0 1%);
    // &:after {
    //   position: absolute;
    //   height: calc(100% + 6px);
    //   content: '';
    //   width: 100%;
    // }
  }
  .hidden-text-label {
    background: #f5eda5;
    z-index: -1;
    top: 6px;
    padding-right: 14px;
  }
}
</style>
