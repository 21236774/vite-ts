<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
/**
 * 获取网格的包围盒
 * @param {Object3D} group 网格对象
 * @returns
 */
function getBoundBox(group) {
  // 计算实际宽高
  var size = new THREE.Vector3()

  // 包围盒计算模型对象的大小和位置
  var box3 = new THREE.Box3()
  box3.expandByObject(group) // 计算模型包围盒
  var boxSize = new THREE.Vector3()
  box3.getSize(boxSize) // 计算包围盒尺寸
  var center = new THREE.Vector3()
  box3.getCenter(center) // 计算一个层级模型对应包围盒的几何体中心坐标
  let obj = {
    box3,
    boxSize,
    center
  }
  if (group.geometry) {
    group.geometry.computeBoundingBox()
    group.geometry.computeBoundingSphere()
    const { max, min } = group.geometry.boundingBox
    size.x = max.x - min.x
    size.y = max.y - min.y
    size.z = max.z - min.z
    obj.size = size
  }
  return obj
}
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

// 设置Uv贴图
const calcUv2 = (geometry, width, height, minX, minY) => {
  const positionAttribute = geometry.attributes.position
  const uvAttribute = geometry.attributes.uv

  const count = geometry.groups[0].count
  for (let i = 0; i < count; i++) {
    const x = positionAttribute.getX(i)
    const y = positionAttribute.getY(i)

    const u = (x - minX) / width
    const v = (y - minY) / height

    uvAttribute.setXY(i, u, v)
  }

  uvAttribute.needsUpdate = true
  geometry.computeVertexNormals()
}

onMounted(() => {
  const container = document.getElementById('threejsSquare' + props.id)
  scene.background = new THREE.Color(0xbfe3dd)
  camera = new THREE.PerspectiveCamera(
    40,
    container?.offsetWidth / container?.offsetHeight || 0,
    0.1,
    10000
  )
  camera.position.set(0, 0, 300) // 举例，设置相机的位置
  camera.lookAt(0, 0, 20)
  const axes = new THREE.AxesHelper(700)
  scene.add(axes)
  setPointLight(scene)

  // 请求湖北数据
  const loader = new THREE.FileLoader()
  loader.load(
    'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
    (data) => {
      const jsondata = JSON.parse(data)
      operationData(jsondata)
    }
  )
  const textureLoader = new THREE.TextureLoader()
  const getTextureMash = () => {
    const topNormal = textureLoader.load('img/ganyu.png')
    topNormal.wrapS = topNormal.wrapT = THREE.RepeatWrapping
    const sideTexture = textureLoader.load('img/side.png')
    sideTexture.wrapS = sideTexture.wrapT = THREE.RepeatWrapping
    console.log(sideTexture, 222)
    const topMaterial = new THREE.MeshStandardMaterial({
      color: '#e5e7eb',
      emissive: 0x000000,
      map: topNormal,
      transparent: true,
      normalMap: topNormal,
      opacity: 1
    })
    sideTexture.repeat.set(1, 0.2)
    sideTexture.offset.y += 0.01
    const sideMaterial = new THREE.MeshStandardMaterial({
      // color: 0x62c3d1,
      color: 0xffffff,
      map: sideTexture,
      fog: false,
      opacity: 0
    })
    sideMaterial.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        uColor1: { value: new THREE.Color(0x30b3ff) },
        uColor2: { value: new THREE.Color(0x30b3ff) }
      }
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        `
        attribute float alpha;
        varying vec3 vPosition;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vPosition = position;
      `
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        varying vec3 vPosition;
        varying float vAlpha;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
      
        void main() {
      `
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        /* glsl */ `
      #ifdef OPAQUE
      diffuseColor.a = 1.0;
      #endif
      
      // https://github.com/mrdoob/three.js/pull/22425
      #ifdef USE_TRANSMISSION
      diffuseColor.a *= transmissionAlpha + 0.1;
      #endif
      vec3 gradient = mix(uColor1, uColor2, vPosition.z/1.2);
      
      outgoingLight = outgoingLight*gradient;
      
      
      gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
      `
      )
    }
    return [topMaterial, sideMaterial]
  }

  const projection = d3
    .geoMercator()
    .center([116.412318, 39.909843])
    .translate([0, 0]) // 坐标转换，设置北京中心点
  // 绘制面，材质
  function drawExtrudeMesh(polygon, color, info) {
    const shape = new THREE.Shape()
    polygon.forEach((row, i) => {
      const [x, y] = projection(row)
      if (i === 0) {
        shape.moveTo(x, y)
      }
      shape.lineTo(x, y)
    })
    console.log(polygon)
    // 拉伸
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelThickness: 0.1
    })
    const materials = getTextureMash()
    const mesh = new THREE.Mesh(geometry, materials)
    mesh.userData = info
    return mesh
  }

  const map = new THREE.Group()
  // 解析数据
  function operationData(jsondata) {
    // 全国信息
    const features = jsondata.features
    features.forEach((feature) => {
      // 单个省份
      const group = new THREE.Group()
      const groupLine = new THREE.Group()
      // 地址
      const coordinates = feature.geometry
      group.userData = feature.properties // 存储当前数据
      const color = 'red'
      if (feature.geometry.type === 'MultiPolygon') {
        // 多个，多边形
        coordinates.coordinates.forEach((coordinate) => {
          // coordinate 多边形数据
          coordinate.forEach((rows) => {
            const mesh = drawExtrudeMesh(rows, color, feature.properties)
            const line = lineDraw(rows, 0x62c3d1)
            groupLine.add(line)
            group.add(mesh)
          })
        })
      }

      if (feature.geometry.type === 'Polygon') {
        // 多边形
        coordinates.coordinates.forEach((coordinate) => {
          const mesh = drawExtrudeMesh(coordinate, color)
          group.add(mesh)
        })
      }
      map.add(groupLine)
      map.add(group)
    })
    scene.add(map)

    // 为每组纹理贴图UV
    const { boxSize, box3 } = getBoundBox(map)
    map.children.forEach((group) => {
      group.children.map((mesh) => {
        if (mesh.type === 'Mesh') {
          calcUv2(mesh.geometry, boxSize.x, boxSize.y, box3.min.x, box3.min.y)
        }
      })
    })
    map.rotation.x = Math.PI
    animate()
  }

  /**
   * 边框 图形绘制
   * @param polygon 多边形 点数组
   * @param color 材质颜色
   * */
  function lineDraw(polygon, color) {
    const lineGeometry = new THREE.BufferGeometry()
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    const pointsArray = new Array()
    polygon.forEach((row) => {
      const [x, y] = projection(row)
      // 创建三维点
      pointsArray.push(new THREE.Vector3(x, y, 1.12))
    })
    // 放入多个点
    lineGeometry.setFromPoints(pointsArray)

    const lineMaterial = new THREE.LineBasicMaterial({
      color: color
    })
    return new THREE.Line(lineGeometry, lineMaterial)
  }

  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)
  objFn()
})
</script>
<template>
  <div style="width: 100%; height: 800px">
    <div :id="'threejsSquare' + id" class="w-full h-full"></div>
  </div>
</template>
