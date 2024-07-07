import * as THREE from "three";
import Game from "./Game";

export default class Renderer {
  constructor() {
    this.game = new Game();
    this.canvas = this.game.canvas;
    this.canvas2d = this.game.canvas2d;
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
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.setClearColor("#1b1a25");

    //2d canvas
    this.canvas2d.width = this.sizes.width;
    this.canvas2d.height = this.sizes.height;
  }
  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // resizing 2d canvas
    // TODO should this resize happen somewhere else? this might be a threejs renderer, not a generic renderer
    this.canvas2d.width = this.sizes.width;
    this.canvas2d.height = this.sizes.height;
  }
  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
