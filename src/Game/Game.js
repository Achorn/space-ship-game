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
import PhysicsEngine from "./PhysicsEngine";
import Stats from "stats.js";
import EndCredits from "./states/EndCredits";

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
    this.ammoPhysics = new PhysicsEngine();
    this.transitionController = new TransitionController();
    this.stateStack = [];
    this.loadStates();

    // this.stats = new Stats();
    // this.stats.showPanel(0);
    // document.body.appendChild(this.stats.dom);

    this.debugStatement = "debug";

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => this.update());
  }

  loadStates() {
    // this.endCredits = new EndCredits();
    // this.stateStack.push(this.endCredits);
    this.titleScreen = new Title();
    this.stateStack.push(this.titleScreen);
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    // this.stats.begin();

    this.userInput.update();

    // this.ammoPhysics.update(this.time.delta);

    this.renderer.update();

    this.context2d.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let curState = this.stateStack[this.stateStack.length - 1];

    curState.update(this.time.delta, this.userInput.controls);
    curState.render(this.context2d);

    this.transitionController.update();
    // this.stats.end();
  }
  destroy() {}
}
