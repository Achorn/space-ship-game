import Game from "../Game";
import * as THREE from "three";

export default class Environment {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;
    this.debug = this.game.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    this.setSunLight();
    this.setEnvironmentMap();
  }

  setSunLight() {
    this.ambientLight = new THREE.AmbientLight("#1b1a20", 2);
    this.directionalLight = new THREE.DirectionalLight("#ffffff", 3);
    this.directionalLight.position.set(1, 1, 0);
    this.scene.add(this.directionalLight, this.ambientLight);
  }
  setEnvironmentMap() {}
}
