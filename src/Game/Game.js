import Debug from "./Utils/Debug";
import Sizes from "./Utils/Sizes";

let instance = null;

export default class Game {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
  }
  resize() {}
  update() {}
  destroy() {}
}
