import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  constructor() {
    // Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2); // sets limit on phones with high pixel ratios

    window.addEventListener("resize", (e) => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2); // sets limit on phones with high pixel ratios
      this.trigger("resize");
    });
  }
}
