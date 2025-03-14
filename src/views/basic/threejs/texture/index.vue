<script setup>
import Mallki from '@/components/TextHoverEffect/index.vue'
import { NGrid, NGi, NProgress } from 'naive-ui'
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import Square from './components/square/index.vue'

const percentage = ref(0)
const cameraX = ref(0)
const cameraY = ref(0)
const cameraZ = ref(0)
const renderer = new THREE.WebGLRenderer({ antialias: true })
const scene = new THREE.Scene() // 创建场景
let camera = null
let controls = null

onMounted(() => {
  const container = document.getElementById('container')
  renderer.setSize(container?.offsetWidth, container?.offsetHeight) //设置three.js渲染区域的尺寸(像素px)
  container.appendChild(renderer.domElement)

  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  scene.background = new THREE.Color(0xbfe3dd)
  scene.environment = pmremGenerator.fromScene(
    new RoomEnvironment(renderer),
    0.04
  ).texture
  camera = new THREE.PerspectiveCamera(
    40,
    container?.offsetWidth / container?.offsetHeight || 0,
    1,
    100
  )
  // 相机位置
  camera.position.set(-3.5, 0.4, 0)
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath(`gltf/`)

  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  loader.load(
    `model/SU7.glb`,
    function (gltf) {
      const model = gltf.scene
      console.log(model)

      // 创建一个新的材质对象，设置颜色为红色，学习阶段先这样吧，到时候在处理
      const material = new THREE.MeshNormalMaterial({
        color: '#22c55e' // 红色
      })
      const material1 = new THREE.MeshStandardMaterial({
        color: '#f1f5f9' // 红色
      })
      const material2 = new THREE.MeshStandardMaterial({
        color: '#737373' // 红色
      })
      const material3 = new THREE.MeshNormalMaterial({
        color: '#86efac' // 红色
      })
      const material4 = new THREE.MeshNormalMaterial({
        color: '#4ade80' // 红色
      })
      const material5 = new THREE.MeshBasicMaterial({
        color: '#b91c1c' // 红色
      })

      // 遍历模型的所有网格，将它们的材质设置为新创建的材质对象
      model.traverse((child) => {
        if (child.isMesh) {
          const { name } = child
          if (name === 'Mesh129') child.material = material
          if (name === 'INSIDE') child.material = material1 // 座椅
          if (name === '-119-126') child.material = material2 // 中控
          if (name === 'Mesh141_1' || name === 'Mesh142_1')
            // 前排门
            child.material = material3
          if (name === 'Mesh143_1' || name === 'Mesh144_1')
            // 后排门
            child.material = material4 // 座椅
          if (name === 'Wheel1001') {
            console.log(child, 222)
            // 轮胎 Wheel1001
            // child.material = material5
            // console.log(child, 66666666)
            // child.userData.speed = 0.01
            // child.rotation.x = 5
            // child.rotation.z = 5
            // child.rotation.y = 5
          }
        }
      })

      // 调整模型位置
      model.position.set(0, -0.6, 0)
      model.scale.set(0.65, 0.65, 0.65)
      scene.add(model)
      renderer.render(scene, camera) //执行渲染操作
    },
    (event) => {
      const percentageVal = Math.round((event.loaded / event.total) * 100)
      if (percentageVal === 100) {
        setTimeout(() => {
          percentage.value = percentageVal
        }, 500)
      } else {
        percentage.value = percentageVal
      }
    },
    function (e) {
      console.error(e)
    }
  )
  // 设置相机控件轨道控制器OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', function () {
    const { x, y, z } = camera.position
    cameraX.value = x
    cameraY.value = y
    cameraZ.value = z
    renderer.render(scene, camera) //执行渲染操作
  })
  renderer.render(scene, camera) //执行渲染操作
})

const originClick = () => {
  camera.position.set(6, 7.5, 6)
  console.log(camera.position, '---------------')
  renderer.render(scene, camera) //执行渲染操作
}
</script>

<template>
  <div ref="draggable">
    <div>343242423432432423</div>
  </div>
  <n-grid :x-gap="12" :y-gap="12" :cols="4">
    <n-gi :span="2">
      <div class="h-101 bg-bg-color rounded-2xl p-21 box-border">
        <mallki class="name" text="坐标位置" />
        <div>
          X: {{ cameraX }}&emsp;&emsp; Y: {{ cameraY }}&emsp;&emsp; Z:
          {{ cameraZ }}
        </div>
      </div>
    </n-gi>
    <n-gi :span="2">
      <div class="h-101 bg-bg-color rounded-2xl p-21 box-border">
        <div style="color: red">测试CI/CD流水线是否有效</div>
        <xdd-button type="success">测试自己组件库</xdd-button>
        <!--        <xdd-button type="success" @click="originClick">回到原点</xdd-button>-->
      </div>
    </n-gi>
  </n-grid>
  <n-grid :x-gap="12" :y-gap="12" :cols="12">
    <n-gi
      :span="4"
      class="mt-5 h-650 bg-bg-color rounded-2xl flex flex-col justify-between"
    >
      <div class="h-320 w-full">
        <Square :is-grid="true" />
      </div>
      <div class="h-320 w-full">
        <Square id="ganyu" url="./img/ganyu.png" />
      </div>
    </n-gi>
    <n-gi :span="8" class="relative mt-5">
      <div
        id="container"
        class="three-modal h-650 bg-bg-color rounded-2xl"
      ></div>
      <div
        v-if="percentage !== 100"
        class="absolute w-full h-full bg-mask justify-center top-0 items-center box-border flex px-10"
      >
        <n-progress
          type="line"
          :percentage="percentage"
          :indicator-placement="'inside'"
          processing
        />
      </div>
    </n-gi>
  </n-grid>
</template>

<style>
.xdd-button {
  margin: 0 !important;
}
</style>
