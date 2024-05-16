import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"

export class Loaders {
  constructor() {
    this.loadingManager = new THREE.LoadingManager(() => {})

    this.textureLoader = new THREE.TextureLoader()

    this.rgbeLoader = new RGBELoader()

    this.gltfLoader = new GLTFLoader()
  }
}
