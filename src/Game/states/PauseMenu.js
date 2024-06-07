import GameState from "./GameState";

export default class PauseMenu extends GameState {
  constructor() {
    super();
  }
  update(deltaTime, actions) {
    if (actions["backspace"]) {
      this.exitState();
    }
    if (actions["q"]) {
      while (this.game.stateStack.length > 1) {
        this.game.stateStack.pop();
      }
    }
    this.game.resetKeys();
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
    context.fillText("press 'delete' to play", 100, 150);
    context.font = "30px serif";
    context.fillStyle = "yellow";
    context.fillText("press 'q' to quit", 100, 200);
  }
}
