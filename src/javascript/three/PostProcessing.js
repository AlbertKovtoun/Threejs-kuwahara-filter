import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { camera, renderer, scene, sizes } from "./Experience"

export class PostProcesing {
  constructor() {
    this.effectComposer = new EffectComposer(renderer.renderer)
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.effectComposer.setSize(sizes.width, sizes.height)

    this.renderPass = new RenderPass(scene, camera.camera)
    this.effectComposer.addPass(this.renderPass)
  }
}
