export default class UserInput {
  constructor() {
    this.controls = {};
    this.setListeners();
  }

  setListeners() {
    document.addEventListener("keydown", (e) => {
      this.controls[e.key.toLowerCase()] = true;
    });
    document.addEventListener(
      "keyup",
      (e) => (this.controls[e.key.toLowerCase()] = false)
    );
  }

  resetKeys() {
    this.controls = {};
  }
}
