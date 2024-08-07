import GameState from "./GameState";
import GameScene from "./GameScene";
import HomeMenu from "./HomeMenu";

export default class Title extends GameState {
  constructor() {
    super();

    // add stars to title
  }

  update(deltaTime) {
    // press any button to enter new state

    if (this.game.userInput.controls["a"] == true) {
      this.game.transitionController.transition(() => {
        let newState = new HomeMenu();
        newState.enterState();
      });
    }
    // this.game.camera.update();

    this.game.userInput.resetKeys();
  }
  render(context) {
    // TODO create 2d context for displaying title sequences menus and such
    //threejs is handing most of the drawing but on our 2d canvas with will esparate the updating and drawing
    context.font = "48px serif";
    context.fillStyle = "white";
    context.fillText("My Tiny Space Ship", 20, 50);
    context.font = "24px serif";
    context.fillStyle = "darkgrey";
    context.fillText("Press Enter to start", 100, 100);
  }
}
