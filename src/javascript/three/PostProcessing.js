import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"
import { camera, renderer, scene, sizes } from "./Experience"

import kuwaharaVertexShader from "../../shaders/kuwahara/vertex.glsl?raw"
import kuwaharaFragmentShader from "../../shaders/kuwahara/fragment.glsl?raw"

export class PostProcesing {
  constructor() {
    this.renderTarget = new THREE.WebGLRenderTarget(800, 600, { samples: 3 })

    this.effectComposer = new EffectComposer(
      renderer.renderer,
      this.renderTarget
    )
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.effectComposer.setSize(sizes.width, sizes.height)

    this.renderPass = new RenderPass(scene, camera.camera)
    this.effectComposer.addPass(this.renderPass)

    this.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
    this.effectComposer.addPass(this.gammaCorrectionPass)

    this.KuwaharaShader = {
      uniforms: {
        tDiffuse: { value: null },
      },
      vertexShader: kuwaharaVertexShader,
      fragmentShader: kuwaharaFragmentShader,
    }

    this.kuwaharaPass = new ShaderPass(this.KuwaharaShader)
    this.effectComposer.addPass(this.kuwaharaPass)

    window.addEventListener("resize", () => {
      this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.effectComposer.setSize(sizes.width, sizes.height)
    })
  }
}
