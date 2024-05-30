import Game from "../Game";
import * as THREE from "three";
export default class BoundarySphere {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;
    this.setMesh();
  }
  setMesh() {
    this.instance = new THREE.Mesh(
      new THREE.SphereGeometry(10),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: "black",
      })
    );
    this.scene.add(this.instance);
  }
}
