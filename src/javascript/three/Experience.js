import * as THREE from "three"
import Stats from "stats.js"
import gsap from "gsap"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Loaders } from "./Loaders"
import { Model } from "./Model"

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const canvas = document.querySelector("canvas.webgl")

export const loaders = new Loaders()

export const scene = new THREE.Scene()
loaders.rgbeLoader.load(
  "/images/evening_road_01_puresky_2k.hdr",
  (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    // scene.background = environmentMap
    scene.environment = environmentMap
  }
)

export const sizes = new Sizes()

export const camera = new Camera()

// const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
// scene.add(ambientLight)

export const model = new Model()

export const renderer = new Renderer()

//Animate
const clock = new THREE.Clock()
let time = Date.now()

const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  // Update controls
  camera.controls.update()

  // Render
  renderer.renderer.render(scene, camera.camera)

  window.requestAnimationFrame(tick)

  stats.end()
}

tick()
