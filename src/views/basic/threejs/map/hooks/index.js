import * as THREE from 'three'
import gsap from 'gsap'
import * as d3 from 'd3'
import { getGroupUUID, createLabel } from '@/utils/threejs'

const textureLoader = new THREE.TextureLoader()
export const getTextureMash = (defaultColor) => {
  const topNormal = textureLoader.load('img/top.jpg')
  topNormal.wrapS = topNormal.wrapT = THREE.RepeatWrapping
  const sideTexture = textureLoader.load('img/side.png')
  sideTexture.wrapS = sideTexture.wrapT = THREE.RepeatWrapping
  const topMaterial = new THREE.MeshStandardMaterial({
    color: defaultColor,
    emissive: 0x000000,
    map: topNormal,
    transparent: true,
    depthTest: true,
    normalMap: topNormal,
    opacity: 1
  })
  sideTexture.repeat.set(1, 0.2)
  sideTexture.offset.y += 0.01
  const sideMaterial = new THREE.MeshStandardMaterial({
    // color: 0x62c3d1,
    color: '#F6EEA7',
    map: sideTexture,
    fog: false,
    opacity: 1
  })
  sideMaterial.onBeforeCompile = (shader) => {
    shader.uniforms = {
      ...shader.uniforms,
      uColor1: { value: new THREE.Color('#F6EEA7') },
      uColor2: { value: new THREE.Color('#F6EEA7') }
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
/**
 * 绘制mesh返回
 * @param {*} polygon 经纬度信息
 * @param {*} info 当前级信息
 * @param {*} projection d3中心点转换后的方法
 * @param {*} defaultColor 默认颜色
 * @returns
 */
export const drawExtrudeMesh = (polygon, info, projection, defaultColor) => {
  const shape = new THREE.Shape()
  polygon.forEach((row, i) => {
    const [x, y] = projection(row)
    if (i === 0) {
      shape.moveTo(x, -y)
    }
    shape.lineTo(x, -y)
  })
  // 拉伸
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 1,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelThickness: 0.1
  })
  const materials = getTextureMash(defaultColor)

  const mesh = new THREE.Mesh(geometry, materials)
  mesh.renderOrder = 9 // 添加层级
  mesh.userData = info
  return mesh
}
/**
 * 地图事件
 * @param {*} elementData 数据源
 * @param {*} activeColor 选中颜色
 * @param {*} map 地图实例
 * @param {*} interactionManager 事件管理
 */
export const addEventMap = (
  elementData,
  activeColor,
  map,
  interactionManager
) => {
  let objectsHover = []
  const reset = (mesh) => {
    gsap.to(mesh.scale, {
      duration: 0.3,
      z: 1,
      onComplete: () => {
        mesh.traverse((obj) => {
          if (obj.isMesh) {
            obj.material[0].emissive.setHex(mesh.userData.materialEmissiveHex)
            obj.material[0].emissiveIntensity = 1
            obj.renderOrder = 9
          }
        })
      }
    })
  }
  const move = (mesh) => {
    gsap.to(mesh.scale, {
      duration: 0.3,
      z: 1.8
    })

    mesh.traverse((obj) => {
      if (obj.isMesh) {
        obj.material[0].emissive.setHex(activeColor)
        obj.material[0].emissiveIntensity = 1.5
        obj.renderOrder = 21
      }
    })
  }
  elementData.forEach((mesh) => {
    // 下钻事件
    mesh.addEventListener('mousedown', () => {})
    mesh.addEventListener('mouseup', () => {})
    mesh.addEventListener('mouseover', (event) => {
      if (!objectsHover.includes(event.target.parent)) {
        objectsHover.push(event.target.parent)
      }
      if (map.visible) {
        document.body.style.cursor = 'pointer'
      }
      move(event.target.parent)
    })
    mesh.addEventListener('mouseleave', (event) => {
      objectsHover = objectsHover.filter(
        (n) => n.userData.name !== event.target.parent.userData.name
      )
      reset(event.target.parent)
      document.body.style.cursor = 'default'
    })
    interactionManager.add(mesh)
  })
}

/**
 * 处理落点和点击弹窗事件
 * @param {*} scene 场景
 * @param {*} interactionManager 事件管理
 * @param {*} regionList 当前区域数据
 * @param {*} d3Center 中心位置
 * @returns
 */
export const setPointAndTip = (
  scene,
  interactionManager,
  regionList,
  d3Center
) => {
  const pointTexture = textureLoader.load('img/point.png')
  const pointMaterial = new THREE.SpriteMaterial({
    map: pointTexture,
    color: 0xffffff,
    transparent: true,
    depthTest: false
  })
  const sprite = new THREE.Sprite(pointMaterial)
  sprite.renderOrder = 30

  // 添加落点和弹窗,和点击事件
  const areaPointArr = []
  const pointModalArr = []

  // 其实也可以不删除，调用隐藏hide的方法
  const removePointTip = () => {
    areaPointArr.forEach((point) => {
      if (point.parent) {
        point.parent.remove(point)
      }
      interactionManager.remove(point) // 移除交互管理器中的点
    })
    pointModalArr.forEach((modal) => {
      if (modal.parent) {
        modal.parent.remove(modal)
      }
    })
    areaPointArr.length = 0 // 清空数组
    pointModalArr.length = 0
  }
  const addPointTip = () => {
    if (!regionList.length) return
    // 先删除掉原先点位在添加新点位
    removePointTip()
    regionList.forEach((region, index) => {
      let { name, centroid = [], adcode } = region
      const [x, y] = d3
        .geoMercator()
        .center(d3Center)
        .scale(150)
        .translate([-1.2, -0.2])(centroid)
      // 点位
      let areaPoint = sprite.clone()
      sprite.material = pointMaterial.clone()
      areaPoint.position.set(x, -y, 1.1)
      areaPoint.scale.set(1.5, 1.5, 1.5)
      areaPoint.userData.adcode = adcode
      areaPoint.userData.type = 'point'
      areaPoint.userData.name = name
      areaPoint.userData.position = [x, -y, 0]
      areaPoint.userData.index = index
      // 对应的点位弹窗
      const pointModal = createLabel(
        `<div class="point-box p-16 bg-slate-700 w-160">
          <h5>${name}</h5>
          <ul>
            <li class="flex">
              <span>正式党员：</span>
              <span>1066</span>
              <span>人</span>
            </li>
            <li class="flex">
              <span>预备党员：</span>
              <span>1066</span>
              <span>人</span>
            </li>
            <li class="flex">
              <span>积极分子：</span>
              <span>1066</span>
              <span>人</span>
            </li>
          </ul>
        </div>`,
        'map-point-modal',
        new THREE.Vector3(x, -y + 1.9, 2.5)
      )
      pointModal.userData.name = name
      pointModal.userData.adcode = adcode
      areaPointArr.push(areaPoint)
      pointModalArr.push(pointModal)
      const myGroup = getGroupUUID(scene, 'group-' + adcode)
      myGroup.add(areaPoint)
      myGroup.add(pointModal)
    })
    // 循环绑定事件
    areaPointArr.forEach((point) => {
      point.addEventListener('mousedown', () => {
        pointModalArr.forEach((el) => {
          if (point.userData.adcode === el.userData.adcode) {
            el.show()
          } else {
            el.hide()
          }
        })
      })
      interactionManager.add(point)
    })
  }
  return {
    removePointTip,
    addPointTip
  }
}
