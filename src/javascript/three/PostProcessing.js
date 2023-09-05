import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { camera, renderer, scene, sizes } from "./Experience"

import kuwaharaVertexShader from "../../shaders/kuwahara/vertex.glsl?raw"
import kuwaharaFragmentShader from "../../shaders/kuwahara/fragment.glsl?raw"

export class PostProcesing {
  constructor() {
    this.effectComposer = new EffectComposer(renderer.renderer)
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.effectComposer.setSize(sizes.width, sizes.height)

    this.renderPass = new RenderPass(scene, camera.camera)
    this.effectComposer.addPass(this.renderPass)

    this.KuwaharaShader = {
      uniforms: {
        tDiffuse: { value: null },
      },
      vertexShader: kuwaharaVertexShader,
      fragmentShader: kuwaharaFragmentShader,
    }

    this.kuwaharaPass = new ShaderPass(this.KuwaharaShader)
    this.effectComposer.addPass(this.kuwaharaPass)
  }
}
