import GameState from "./GameState";
import GameScene from "./GameScene";
import Menu from "../../ui/menu";
import HomeMenu from "./HomeMenu";

export default class Title extends GameState {
  constructor() {
    super();
    this.menu = new Menu();
    // add stars to title
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
