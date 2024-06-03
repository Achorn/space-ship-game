import * as THREE from "three";
import Debug from "./Utils/Debug";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import UserInput from "./UserInput";

let instance = null;

export default class Game {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.userInput = new UserInput();
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.world = new World();
    this.camera = new Camera();
    this.renderer = new Renderer();

    // Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => this.update());
  }
  resize() {
    this.camera.resize();
    this.world.update();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
  destroy() {}
}
