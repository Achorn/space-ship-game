import GameState from "./GameState";
import HomeMenu from "./HomeMenu";

export default class Title extends GameState {
  constructor() {
    super();
  }

  update(deltaTime) {
    if (this.game.userInput.controls["enter"] == true) {
      new HomeMenu().enterState();
    }

    this.game.userInput.resetKeys();
  }
  render(context) {
    context.font = "48px serif";
    context.fillStyle = "white";
    context.fillText("My Tiny Space Ship", 20, 50);
    context.font = "24px serif";
    context.fillStyle = "darkgrey";
    context.fillText("Press Enter to start", 100, 100);
  }
}
