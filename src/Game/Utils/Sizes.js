import Game from "../Game";
import EventEmitter from "./EventEmiter";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    // Setup
    this.game = new Game();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.isFullScreen = !!(
      document.fullscreenElement || document.webkitFullscreenElement
    );

    window.addEventListener("orientationchange", (e) => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.trigger("resize");
    });

    window.addEventListener("resize", (e) => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.trigger("resize");
    });
  }
  toggleFullscreen() {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;
    const bodyElement = document.body;
    if (!fullscreenElement) {
      if (bodyElement.requestFullscreen) {
        bodyElement.requestFullscreen();
      } else if (bodyElement.webkitRequestFullscreen) {
        bodyElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    this.isFullScreen = !!(
      document.fullscreenElement || document.webkitFullscreenElement
    );
  }
}
