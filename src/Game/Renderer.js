import * as THREE from "three";
import Game from "./Game";

export default class Renderer {
  constructor() {
    this.game = new Game();
    this.canvas = this.game.canvas;
    this.sizes = this.game.sizes;
    this.scene = this.game.scene;
    this.camera = this.game.camera;

    this.setInstance();
  }
  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });

    // this.instance.toneMapping = THREE.CineonToneMapping;
    // this.instance.toneMappingExposure = 1.75;
    // this.instance.shadowMap.enabled = true;
    // this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.instance.setClearColor("#211d20"); // TODO dont knwo what this will do
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
