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
    //todo
    let controls = this.game.userInput.controls;

    //angle ship
    this.keys.up = Math.max(controls.leftAnalogForward, 0);
    this.keys.down = Math.min(controls.leftAnalogForward, 0);
    this.keys.left = Math.min(controls.leftAnalogSide, 0);
    this.keys.right = Math.max(controls.leftAnalogSide, 0);

    //rotate ship
    this.keys.forward = Math.max(controls.rightAnalogForward, 0);
    this.keys.backward = Math.min(controls.rightAnalogForward, 0);
    this.keys.rotateLeft = Math.min(controls.rightAnalogSide, 0);
    this.keys.rotateRight = Math.max(controls.rightAnalogSide, 0);
    // shoot
    this.keys.shoot = controls.rightBumper;
  }
}
