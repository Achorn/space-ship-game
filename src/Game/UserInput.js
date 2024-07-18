export default class UserInput {
  constructor() {
    this.controls = {};
    this.setListeners();
    this.controllerIndex = null;
    this.gamepad = null;
  }

  setListeners() {
    //set up gamepad connections
    window.addEventListener("gamepadconnected", (e) => {
      this.controllerIndex = e.gamepad.index;
      this.gamepad = navigator.getGamepads()[0];
    });

    window.addEventListener("gamepaddisconnected", (e) => {
      this.controllerIndex = null;
    });

    //setup keyboard clicky clacky
    document.addEventListener("keydown", (e) => {
      if (this.controllerIndex) return;
      switch (e.key) {
        case "ArrowUp":
          this.controls.rightAnalogUp = true;
          break;
        case "ArrowDown":
          this.controls.rightAnalogDown = true;
          break;
        case "ArrowLeft":
          this.controls.rightAnalogLeft = true;
          break;
        case "ArrowRight":
          this.controls.rightAnalogRight = true;
          break;
        case "w":
          this.controls.leftAnalogUp = true;
          break;
        case "s":
          this.controls.leftAnalogDown = true;
          break;
        case "a":
          this.controls.leftAnalogLeft = true;
          break;
        case "d":
          this.controls.leftAnalogRight = true;
          break;
        case "p":
          this.controls.start = true;
          break;
        case "Enter":
          this.controls.a = true;
          break;

        case " ":
          this.controls.rightBumper = true;
          break;
        default:
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      if (this.controllerIndex) return;

      switch (e.key) {
        case "ArrowUp":
          this.controls.rightAnalogUp = false;
          break;
        case "ArrowDown":
          this.controls.rightAnalogDown = false;
          break;
        case "ArrowLeft":
          this.controls.rightAnalogLeft = false;
          break;
        case "ArrowRight":
          this.controls.rightAnalogRight = false;
          break;
        case "w":
          this.controls.leftAnalogUp = false;
          break;
        case "s":
          this.controls.leftAnalogDown = false;
          break;
        case "a":
          this.controls.leftAnalogLeft = false;
          break;
        case "d":
          this.controls.leftAnalogRight = false;
          break;
        case "p":
          this.controls.start = false;
          break;
        case " ":
          this.controls.rightBumper = false;
          break;
        default:
          break;
      }
    });

    // setup gamepad clicky clacky
    document.addEventListener("gamepadButtonDown", (e) => {
      switch (e.detail.buttonIndex) {
        case 0:
          this.controls.b = true;
          break;
        case 1:
          this.controls.a = true;
          break;
        case 2:
          this.controls.y = true;
          break;
        case 3:
          this.controls.x = true;
          break;
        case 4:
          this.controls.leftBumper = true;
          break;
        case 5:
          this.controls.rightBumper = true;
          break;
        case 6:
          this.controls.LeftTrigger = true;
          break;
        case 7:
          this.controls.rightTrigger = true;
          break;
        case 9:
          this.controls.start = true;
          break;
        case 12:
          this.controls.dPadUp = true;
          break;
        case 13:
          this.controls.dPadDown = true;
          break;
        case 14:
          this.controls.dPadLeft = true;
          break;
        case 15:
          this.controls.dPadRight = true;
          break;
      }
    });
    document.addEventListener("gamepadButtonUp", (e) => {
      switch (e.detail.buttonIndex) {
        case 0:
          this.controls.b = false;
          break;
        case 1:
          this.controls.a = false;
          break;
        case 2:
          this.controls.y = false;
          break;
        case 3:
          this.controls.x = false;
          break;
        case 4:
          this.controls.leftBumper = false;
          break;
        case 5:
          this.controls.rightBumper = false;
          break;
        case 6:
          this.controls.LeftTrigger = false;
          break;
        case 7:
          this.controls.rightTrigger = false;
          break;
        case 9:
          this.controls.start = false;
          break;
        case 12:
          this.controls.dPadUp = false;
          break;
        case 13:
          this.controls.dPadDown = false;
          break;
        case 14:
          this.controls.dPadLeft = false;
          break;
        case 15:
          this.controls.dPadRight = false;
          break;
      }
    });
  }

  updateGamepad() {
    let newGamepad = navigator.getGamepads()[0];
    if (!newGamepad) return;
    newGamepad.buttons.forEach((button, index) => {
      const oldButtonPressed = this.gamepad?.buttons[index].pressed;
      if (button.pressed !== oldButtonPressed) {
        if (button.pressed && !oldButtonPressed) {
          document.dispatchEvent(
            new CustomEvent("gamepadButtonDown", {
              detail: { buttonIndex: index },
            })
          );
        }
        if (!button.pressed && oldButtonPressed) {
          document.dispatchEvent(
            new CustomEvent("gamepadButtonUp", {
              detail: { buttonIndex: index },
            })
          );
        }
      }
    });
    this.gamepad = newGamepad;
  }
  gamepadControllerInput() {
    if (this.controllerIndex == null) return;

    const gamepad = navigator.getGamepads()[this.controllerIndex];
    const buttons = gamepad.buttons;

    // ABXY BUTTONS
    // this.controls.b = buttons[0].pressed;
    // this.controls.a = buttons[1].pressed;
    // this.controls.y = buttons[2].pressed;
    // this.controls.x = buttons[3].pressed;

    //Dpad
    // this.controls.dPadUp = buttons[12].pressed;
    // this.controls.dPadDown = buttons[13].pressed;
    // this.controls.dPadLeft = buttons[14].pressed;
    // this.controls.dPadRight = buttons[15].pressed;

    //Left Analog
    this.controls.leftAnalogUp = gamepad.axes[1] < -0.7;
    this.controls.leftAnalogDown = gamepad.axes[1] > 0.7;
    this.controls.leftAnalogLeft = gamepad.axes[0] < -0.7;
    this.controls.leftAnalogRight = gamepad.axes[0] > 0.7;
    this.controls.leftAnalogClick = buttons[10].pressed;

    //Right Analog
    this.controls.rightAnalogUp = gamepad.axes[3] < -0.7;
    this.controls.rightAnalogDown = gamepad.axes[3] > 0.7;
    this.controls.rightAnalogLeft = gamepad.axes[2] < -0.7;
    this.controls.rightAnalogRight = gamepad.axes[2] > 0.7;
    this.controls.rightAnalogClick = buttons[11].pressed;

    //Trigger buttons
    // this.controls.leftBumper = buttons[4].pressed;
    // this.controls.LeftTrigger = buttons[6].pressed;
    // this.controls.rightBumper = buttons[5].pressed;
    // this.controls.rightTrigger = buttons[7].pressed;

    // start buttons
    // this.controls.start = buttons[9].pressed;
  }

  resetKeys() {
    this.controls = {};
  }
}
