import { loaders, scene } from "./Experience"

export class Model {
  constructor() {
    this.setModel()
  }

  setModel() {
    this.model = loaders.gltfLoader.load("/models/box.glb", (gltf) => {
      this.modelGroup = gltf.scene
      scene.add(this.modelGroup)
    })
  }
}
