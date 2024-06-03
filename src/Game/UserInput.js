export default class UserInput {
  constructor() {
    this.pressedKeys = [];
    this.setListeners();
  }
  setListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.addKey("left");
      if (e.key === "ArrowRight") this.addKey("right");
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") this.removeKey("left");
      if (e.key === "ArrowRight") this.removeKey("right");
    });
  }
  addKey(key) {
    if (!this.pressedKeys.includes(key)) this.pressedKeys.push(key);
  }
  removeKey(key) {
    this.pressedKeys = this.pressedKeys.filter((k) => k != key);
  }
  getDirection() {
    // TODO: more of a movedment angle than direction
    if (this.pressedKeys.length > 0)
      return this.pressedKeys[this.pressedKeys.length - 1];
    else return null;
  }
}
