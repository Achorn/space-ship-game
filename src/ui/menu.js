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
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 300;
    this.brickHeight = 70;
    this.brickPadding = 20;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 300;
    this.bricks = [];
    this.createBricks();
  }
  createBricks = () => {
    for (let c = 0; c < this.brickRowCount; c++) {
      this.bricks[c] = { x: 0, y: 0 };
    }
  };

  update() {
    let actions = this.game.userInput.controls;
    if (actions["enter"] == true) {
      console.log(this.buttons[this.selectedIndex].name);
      this.buttons[this.selectedIndex].action();
    }
    if (actions["arrowup"] == true) {
      if (this.selectedIndex > 0) this.selectedIndex--;
    } else if (actions["arrowdown"] == true) {
      if (this.selectedIndex < this.bricks.length - 1) this.selectedIndex++;
    }
  }
  draw() {
    this.drawButtons();
  }

  drawButtons = () => {
    let menuStartPos =
      this.canvas.height / 2 - this.bricks.length * this.brickHeight;
    for (let c = 0; c < this.brickRowCount; c++) {
      const brickX = this.canvas.width / 2 - this.brickWidth / 2;
      const brickY =
        c * (this.brickHeight + this.brickPadding) +
        this.brickOffsetTop +
        menuStartPos;
      this.bricks[c].x = brickX;
      this.bricks[c].y = brickY;
      this.ctx.beginPath();
      this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
      this.ctx.fillStyle = this.selectedIndex == c ? "red" : "#0095DD";
      this.ctx.fill();
      this.ctx.closePath();
    }
  };
}

export default Menu;
