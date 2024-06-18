import GameState from "./GameState";

export default class PauseMenu extends GameState {
  constructor() {
    super();
  }
  update(deltaTime) {
    let actions = this.game.userInput.controls;

    if (actions["p"] == true) {
      this.exitState();
    }
    if (actions["q"] == true) {
      this.game.userInput.resetKeys();

      while (this.game.stateStack.length > 1) {
        this.game.stateStack[this.game.stateStack.length - 1].exitState();
      }
    }
    this.game.userInput.resetKeys();
  }

  render(context) {
    this.prevState.render(context);

    context.beginPath(); // Start a new path
    context.rect(10, 20, 550, 200); // Add a rectangle to the current path
    context.fill(); // Render the path
    context.font = "48px serif";
    context.fillStyle = "black";
    context.fillText("pause menu", 100, 100);
    context.font = "30px serif";
    context.fillStyle = "yellow";
    context.fillText("press 'P' to play", 100, 150);
    context.font = "30px serif";
    context.fillStyle = "yellow";
    context.fillText("press 'Q' to quit", 100, 200);
  }
}
