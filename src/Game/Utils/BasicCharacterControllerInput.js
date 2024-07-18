import Game from "../Game";

export default class BasicCharacterControllerInput {
  constructor() {
    this.game = new Game();
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      rotateLeft: false,
      rotateRight: false,
      down: false,
      up: false,
      start: false,
      shoot: false,
    };
  }

  update() {
    let controls = this.game.userInput.controls;

    //angle ship
    this.keys.right = controls.leftAnalogRight;
    this.keys.up = controls.leftAnalogDown;
    this.keys.left = controls.leftAnalogLeft;
    this.keys.down = controls.leftAnalogUp;

    //rotate ship
    this.keys.forward = controls.rightAnalogUp;
    this.keys.backward = controls.rightAnalogDown;
    this.keys.rotateLeft = controls.rightAnalogLeft;
    this.keys.rotateRight = controls.rightAnalogRight;

    // shoot
    this.keys.shoot = controls.rightBumper;
  }
}
