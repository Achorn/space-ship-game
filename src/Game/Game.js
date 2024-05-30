export default class Game {
  constructor(canvas) {
    console.log("game class constructor ");

    // Options
    this.canvas = canvas;

    // Setup
    this.debug = new Debug();
  }
  resize() {}
  update() {}
  destroy() {}
}
