import Game from "../Game/Game";
import GameScene from "../Game/states/GameScene";

class Menu {
  constructor(buttons) {
    this.game = new Game();
    this.canvas = this.game.canvas2d;
    this.ctx = this.game.context2d;
    this.buttons = buttons;
    this.title = "MENU";
    this.selectedIndex = 0;
    this.brickColumnCountbricks = [];
    this.buttonRowCount = buttons.length;
    this.buttonColumnCount = 5;
    this.buttonWidth = 300;
    this.buttonHeight = 70;
    this.buttonPadding = 20;
    this.buttonOffsetTop = 30;
    this.buttonOffsetLeft = 300;
    this.bricks = [];
    this.createButtons();
  }
  createButtons = () => {
    for (let c = 0; c < this.buttonRowCount; c++) {
      this.bricks[c] = { x: 0, y: 0 };
    }
  };

  update() {
    //check controller buttons on release to keep from scrolling all the way down

    let actions = this.game.userInput.controls;
    if (actions["a"] == true) {
      this.buttons[this.selectedIndex].action();
    }
    if (actions["rightAnalogUp"] == true || actions["dPadUp"] == true) {
      if (this.selectedIndex > 0) this.selectedIndex--;
    } else if (
      actions["rightAnalogDown"] == true ||
      actions["dPadDown"] == true
    ) {
      if (this.selectedIndex < this.bricks.length - 1) this.selectedIndex++;
    }
  }
  draw() {
    this.drawButtons();
  }

  drawButtons = () => {
    let menuStartPos =
      this.canvas.height / 2 - this.bricks.length * this.buttonHeight;
    for (let c = 0; c < this.buttonRowCount; c++) {
      const brickX = this.canvas.width / 2 - this.buttonWidth / 2;
      const brickY =
        c * (this.buttonHeight + this.buttonPadding) +
        this.buttonOffsetTop +
        menuStartPos;
      this.bricks[c].x = brickX;
      this.bricks[c].y = brickY;
      this.ctx.beginPath();
      this.ctx.rect(brickX, brickY, this.buttonWidth, this.buttonHeight);
      this.ctx.fillStyle = this.selectedIndex == c ? "red" : "#0095DD";
      this.ctx.fill();

      this.ctx.closePath();
      this.ctx.save();
      this.ctx.font = "48px serif";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        this.buttons[c].name,
        brickX + this.buttonWidth / 2,
        brickY + this.buttonHeight / 2
      );
      this.ctx.restore();

      // this.ctx.closePath();
    }
  };
}

export default Menu;
