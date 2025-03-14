// 不熟练所以使用js
import * as THREE from 'three'
import * as d3 from 'd3'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  CSS3DObject,
  CSS3DSprite,
  CSS3DRenderer
} from 'three/examples/jsm/renderers/CSS3DRenderer'
/**
 * 边框 图形绘制
 * @param polygon 多边形 点数组
 * @param color 材质颜色
 * */
function lineDraw(polygon, color, projection) {
  const lineGeometry = new THREE.BufferGeometry()
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  const pointsArray = new Array()
  polygon.forEach((row) => {
    const [x, y] = projection(row)
    // 创建三维点
    pointsArray.push(new THREE.Vector3(x, -y, 1.12))
  })
  // 放入多个点
  lineGeometry.setFromPoints(pointsArray)

  const lineMaterial = new THREE.LineBasicMaterial({
    color: color,
    transparent: false
  })
  return new THREE.Line(lineGeometry, lineMaterial)
}

/**
 * 获取mesh网格的包围盒
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

// 设置Uv贴图
function calcUv2(geometry, width, height, minX, minY) {
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

function controlsFn(camera, scene, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', function () {
    renderer.render(scene, camera) //执行渲染操作
  })
}

// 计算mesh中心点
function getBoxInfo(mesh) {
  // 创建一个包围盒
  const box3 = new THREE.Box3()
  // 添加包围盒对象
  box3.expandByObject(mesh)
  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  // 通过box3提供的api获取到center和size
  box3.getCenter(center)
  box3.getSize(size)
  return {
    size,
    center
  }
}

// 获取中心点坐标的转换值
function geoProjection(center) {
  return d3.geoMercator().center(center).translate([0, 0])
}

/**
 * 创建HTML label
 * @param {*} html 字符串HTML
 * @param {*} className 类名
 * @param {*} position xyz轴位置
 * @param {Boolean} isSprite 是否需要3DSprite
 * @returns
 */
function createLabel(
  html = '',
  className = 'map-label',
  position,
  isSprite = true
) {
  let tag = document.createElement('div')
  tag.innerHTML = html
  tag.style.backfacVisibility = 'hidden'
  tag.style.visibility = 'hidden'
  tag.style.position = 'absolute'
  tag.className = className
  // CSS3DObject不会跟随相机
  let label = null
  if (isSprite) label = new CSS3DSprite(tag)
  else label = new CSS3DObject(tag)
  label.position.set(position.x, position.y, position.z)
  label.scale.set(0.02, 0.02, 0.02)
  // label.rotateZ(Math.PI / 2)
  label.hide = () => {
    label.element.style.visibility = 'hidden'
  }
  label.show = () => {
    label.element.style.visibility = 'visible'
  }
  return label
}

function createCss3dRender(container) {
  const css3dRender = new CSS3DRenderer() // 实例化css3d渲染器
  css3dRender.setSize(container?.offsetWidth, container?.offsetHeight) // 设置渲染器的尺寸
  css3dRender.domElement.style.position = 'absolute' // 设置定位位置
  css3dRender.domElement.style.left = '0px'
  css3dRender.domElement.style.top = '0px'
  css3dRender.domElement.style.pointerEvents = 'none' // 设置不能被选中
  css3dRender.domElement.className = 'label3d-3d'
  container.appendChild(css3dRender.domElement)
  return css3dRender
}

function getGroupUUID(scene, uuid) {
  let foundObject = null

  scene.traverse((object) => {
    if (object.type === 'Group') {
      // console.log(uuid)
      if (object.uuid === uuid) {
        foundObject = object
        return false // 停止遍历
      }
    }
  })

  return foundObject
}

export {
  lineDraw,
  getBoundBox,
  calcUv2,
  getGroupUUID,
  controlsFn,
  getBoxInfo,
  geoProjection,
  createLabel,
  createCss3dRender
}
