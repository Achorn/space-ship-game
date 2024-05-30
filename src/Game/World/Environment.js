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

  setSunLight() {}
  setEnvironmentMap() {}
}
