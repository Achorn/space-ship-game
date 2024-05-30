import Debug from "./Utils/Debug";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

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
    this.time = new Time();
  }
  resize() {}
  update() {}
  destroy() {}
}
