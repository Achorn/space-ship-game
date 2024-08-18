import * as THREE from "three";
import Debug from "./Utils/Debug";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import UserInput from "./UserInput";
import Title from "./states/Title";
import TransitionController from "./Utils/TransitionController";
import GameScene from "./states/GameScene";
import DialogState from "./states/dialog/DialogState";

let instance = null;

export default class Game {
  constructor(canvas, canvas2d) {
    if (instance) return instance;
    instance = this;

    // Options
    this.canvas = canvas;
    this.canvas2d = canvas2d;
    this.context2d = this.canvas2d.getContext("2d");

    // Setup
    this.userInput = new UserInput();
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.transitionController = new TransitionController();
    this.stateStack = [];
    this.loadStates();

    this.debugStatement = "debug";

    // Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => this.update());
  }

  loadStates() {
    this.titleScreen = new Title();
    this.stateStack.push(this.titleScreen);
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.userInput.gamepadControllerInput();
    this.userInput.updateGamepad();

    this.renderer.update();

    this.context2d.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.stateStack[this.stateStack.length - 1].update(
      this.time.delta,
      this.userInput.controls
    );

    this.stateStack[this.stateStack.length - 1].render(this.context2d);
    this.transitionController.update();
    // this.canvas2d.context.font = "24px serif";
    // this.canvas2d.context.fillStyle = "white";
    // this.canvas2d.context.fillText(this.game.debugStatement, 100, 400);
  }
  destroy() {}
}
