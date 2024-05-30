import EventEmitter from "./EventEmmiter";

export default class Time extends EventEmitter {
  constructor() {
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta - 16;
    //this.delta == 0 can cause bugs and errors

    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    const currentTime = date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => this.tick());
  }
}
