import * as THREE from 'three'
import gsap from 'gsap'

const textureLoader = new THREE.TextureLoader()

const getCircleMaterial = (map) => {
  const position = new THREE.Vector3(0, 0.06, 0)
  // MeshBasicMaterial 不被光照印象
  const material = new THREE.MeshBasicMaterial({
    map,
    transparent: true,
    opacity: 1,
    color: '#F9C978',
    depthTest: false,
    depthWrite: false,
    fog: false
  })
  const plane = new THREE.PlaneGeometry(100, 100)
  const mesh = new THREE.Mesh(plane, material)
  mesh.scale.set(0, 0, 0)
  // mesh.rotateX(-Math.PI / 2)
  mesh.position.copy(position)
  return mesh
}
const gaspScale = (mesh) => {
  gsap.to(mesh.scale, {
    delay: 0.5,
    duration: 1,
    x: 0.2,
    y: 0.2,
    z: 0.2,
    ease: 'circ.out'
  })
}
// 动画函数
const rotationAnimation = (run) => {
  run()
  window.requestAnimationFrame(() => {
    rotationAnimation(run)
  })
}
// 圆圈动画
export const circleAt = (scene) => {
  const rotationBorder1 = textureLoader.load('img/rotationBorder1.png')
  const rotationBorder2 = textureLoader.load('img/rotationBorder2.png')
  const mesh1 = getCircleMaterial(rotationBorder1)
  const mesh2 = getCircleMaterial(rotationBorder2)
  // mesh.rotateX(-Math.PI / 2)
  scene.add(mesh1)
  scene.add(mesh2)
  // 创建时间线
  const tl = gsap.timeline()
  tl.addLabel('focusMapOpacity', 4.0)
  gaspScale(mesh1)
  gaspScale(mesh2)
  rotationAnimation(() => {
    mesh1.rotation.z += 0.004
    mesh2.rotation.z -= 0.004
  })
}
