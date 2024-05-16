<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
const renderer = new THREE.WebGLRenderer({ antialias: true }) // 创建渲染器
const textureLoader = new THREE.TextureLoader() // 创建纹理加载器
function animate() {
  requestAnimationFrame(animate)
  // 如果有动画，更新相关对象的位置、旋转等属性
  renderer.render(scene, camera)
}
const objFn = () => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', function () {
    renderer.render(scene, camera) //执行渲染操作
  })
}

onMounted(() => {
  const container = document.getElementById('threejsSquare' + props.id)
  scene.background = new THREE.Color(0xbfe3dd)
  camera = new THREE.PerspectiveCamera(
    40,
    container?.offsetWidth / container?.offsetHeight || 0,
    1,
    100
  )
  camera.position.set(30, 20, 30) // 举例，设置相机的位置
  camera.lookAt(scene.position)

  // 添加地面
  // const ground = new THREE.Mesh(
  //   new THREE.PlaneGeometry(500, 500),
  //   new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
  // )
  // ground.rotation.x = -Math.PI / 2
  // ground.receiveShadow = true
  // scene.add(ground)

  // 添加网格
  if (props.isGrid) {
    const grid = new THREE.GridHelper(50, 20, 0xc1c1c1, 0x8d8d8d)
    grid.material.opacity = 0.2
    grid.material.transparent = true
    scene.add(grid)
  }

  const chungeLoader = textureLoader.load(props.url)
  let geometry
  if (props.id === 1) {
    geometry = new THREE.BoxGeometry(10, 10, 10)
  } else {
    geometry = new THREE.SphereGeometry(10, 10, 10)
  }
  const material = new THREE.MeshBasicMaterial({
    map: chungeLoader
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 5, 0)
  scene.add(mesh)
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)
  objFn()
  animate()
})
</script>
<template>
  <div :id="'threejsSquare' + id" class="w-full h-full"></div>
</template>
