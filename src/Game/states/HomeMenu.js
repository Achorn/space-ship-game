import GameState from "./GameState";
import GameScene from "./GameScene";
import Menu from "../../ui/menu";
import OptionsMenu from "./OptionsMenu";
import DialogState from "./dialog/DialogState";

class HomeMenu extends GameState {
  constructor() {
    super();
    this.buttons = [
      {
        name: "play",
        action: () => {
          this.game.transitionController.transition({
            midAction: () => {
              new GameScene().enterState();
            },
            fadeIntTime: 1.5,
            endAction: () => {
              new DialogState({
                script: [
                  "HHi bud",
                  "It's your friend Tommy!",
                  "I'm so glad you've come to visit, and wow! you've already made it to our station.",
                  "Actually you're a bit too early...",
                  "Unfortunately, some debris has been tossed away in our neighborhood, and it's jamming our ability to open the docking bay to let you land...",
                  "Could you help us out by blasting away these colorful chunks spinning around?",
                  "You will??",
                  "That's very helpful of you.",
                  "You should be able to blast them by pressing the right shoulder button on your controller",
                  "When you're ready, press A to continue.",
                ],
                dialogFinishedAction: () => {},
              }).enterState();
            },
          });
        },
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
