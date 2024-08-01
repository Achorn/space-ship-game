import Menu from "../../ui/menu";
import GameState from "./GameState";
import OptionsMenu from "./OptionsMenu";

class PauseMenu extends GameState {
  constructor() {
    super();
    this.buttons = [
      {
        name: "continue",
        action: () =>
          this.game.stateStack[this.game.stateStack.length - 1].exitState(),
      },
      { name: "options", action: () => new OptionsMenu().enterState() },
      {
        name: "quit",
        action: () => {
          this.game.transitionController.transition(() => {
            while (this.game.stateStack.length > 1) {
              this.game.stateStack[this.game.stateStack.length - 1].exitState();
            }
          });
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
export default PauseMenu;
