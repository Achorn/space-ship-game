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
      this.game.transitionController.transition(() => {
        let newState = new HomeMenu();
        newState.enterState();
      });
    }
    // this.game.camera.update();

    this.game.userInput.resetKeys();
  }
  render(context) {
    let x = this.game.canvas.width / 2;
    // TODO create 2d context for displaying title sequences menus and such
    //threejs is handing most of the drawing but on our 2d canvas with will esparate the updating and drawing

    context.save();
    context.font = "48px serif";
    context.fillStyle = "white";
    context.textAlign = "center";

    context.fillText("My Tiny Space Ship", x / 2, 100);
    context.font = "24px serif";
    context.fillStyle = "darkgrey";
    context.fillText("Press Start to Begin", x / 2, 150);
    context.restore();
  }
}
