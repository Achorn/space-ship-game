export default class BasicCharacterControllerInput {
  constructor() {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      rotateLeft: false,
      rotateRight: false,
      down: false,
      up: false,
    };
    document.addEventListener("keydown", (e) => this.onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this.onKeyUp(e), false);
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this.keys.down = true;
        break;
      case 65: // a
        this.keys.left = true;
        break;
      case 83: // s
        this.keys.up = true;
        break;
      case 68: // d
        this.keys.right = true;
        break;
      case 87: //  left arrow
        this.keys.rotateLeft = true;
        break;
      case 39: //  right arrow
        this.keys.rotateRight = true;
        break;
      case 38: //  up arrow
        this.keys.forward = true;
        break;
      case 40: //  down arrow
        this.keys.backward = true;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case 87: // w
        this.keys.down = false;
        break;
      case 65: // a
        this.keys.left = false;
        break;
      case 83: // s
        this.keys.up = false;
        break;
      case 68: // d
        this.keys.right = false;
        break;
      case 87: //  left arrow
        this.keys.rotateLeft = false;
        break;
      case 39: //  right arrow
        this.keys.rotateRight = false;
        break;
      case 38: //  up arrow
        this.keys.forward = false;
        break;
      case 40: //  down arrow
        this.keys.backward = false;
        break;
    }
  }
}
