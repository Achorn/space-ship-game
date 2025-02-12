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

    if (this.game.userInput.controls["start"] == true) {
      this.game.transitionController.transition({
        midAction: () => {
          let newState = new HomeMenu();
          newState.enterState();
        },
      });
    }
    // this.game.camera.update();

    this.game.userInput.resetKeys();
  }
  render(context) {
    let canvWidth = this.game.canvas2d.width;
    // TODO create 2d context for displaying title sequences menus and such
    //threejs is handing most of the drawing but on our 2d canvas with will esparate the updating and drawing

    context.save();
    context.font = "48px serif";
    context.fillStyle = "white";
    context.textAlign = "center";

    context.fillText("My Tiny Space Ship", canvWidth / 2, 100);
    context.font = "24px serif";
    context.fillStyle = "darkgrey";
    context.fillText("Press Start to Begin", canvWidth / 2, 150);
    context.restore();
  }
}
