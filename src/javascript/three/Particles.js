import * as THREE from "three"

import particlesVertexShader from "../../shaders/particles/vertex.glsl?raw"
import particlesFragmentShader from "../../shaders/particles/fragment.glsl?raw"
import { scene } from "./Experience"

export class Particles {
  constructor() {
    this.setParticles()
  }

  setParticles() {
    const particleCount = 1000

    const geometry = new THREE.BufferGeometry()

    const positions = []
    const positionVectors = []
    const randoms = new Float32Array(particleCount)
    const colors = []

    const color = new THREE.Color()

    const n = 2,
      n2 = n / 2 // particles spread in the sphere + put sphere in center

    for (let i = 0; i < particleCount; i++) {
      // positions
      const x = Math.random() * n - n2
      const y = Math.random() * n - n2
      const z = Math.random() * n - n2

      positionVectors.push(new THREE.Vector3(x, y, z))

      //For circle
      if (positionVectors[i].distanceTo(new THREE.Vector3(0, 0, 0)) < n / 2) {
        positions.push(x, y, z)
        randoms[i] = Math.random()
      }

      //For Square
      //   positions.push(x, y, z)
      //   randoms[i] = Math.random()
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1))

    geometry.computeBoundingSphere()

    this.particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,

      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
    })

    this.particlesPoints = new THREE.Points(geometry, this.particlesMaterial)
    scene.add(this.particlesPoints)
  }

  update(elapsedTime) {
    this.particlesMaterial.uniforms.uTime.value = elapsedTime
  }
}
