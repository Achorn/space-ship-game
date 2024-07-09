import GameState from "./GameState";
import GameScene from "./GameScene";
import Menu from "../../ui/menu";
import OptionsMenu from "./OptionsMenu";

class HomeMenu extends GameState {
  constructor() {
    super();
    this.buttons = [
      {
        name: "play",
        action: () => new GameScene().enterState(),
      },
      { name: "options", action: () => new OptionsMenu().enterState() },
      {
        name: "quit",
        action: () => {
          this.game.stateStack[this.game.stateStack.length - 1].exitState();
        },
      },
    ];
    this.menu = new Menu(this.buttons);
  }

  update(deltaTime) {
    this.menu.update(this.game.userInput.controls);

    this.game.userInput.resetKeys();
  }
  render(context) {
    this.menu.draw();
  }
}

export default HomeMenu;
