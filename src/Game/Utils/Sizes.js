import EventEmitter from "./EventEmiter";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    // Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    window.addEventListener("resize", (e) => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.trigger("resize");
    });
  }
}
