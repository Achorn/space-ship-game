import GameState from "./GameState";
import GameWorld from "./GameWorld";

export default class Title extends GameState {
  constructor() {
    super();
  }

  update(deltaTime, actions) {
    // press any button to enter new state
    if (Object.keys(value).length != 0) {
      let newState;
      new State.enterState();
    }
    this.game.userInput.resetKeys();
  }
  render(context) {
    // TODO create 2d context for displaying title sequences menus and such
    //threejs is handing most of the drawing but on our 2d canvas with will esparate the updating and drawing
    context.font = "48px serif";
    context.fillStyle = "black";
    context.fillText("Game States Demo", 10, 50);
    context.font = "24px serif";
    context.fillStyle = "darkgrey";
    context.fillText("press enter to play", 100, 100);
  }
}
