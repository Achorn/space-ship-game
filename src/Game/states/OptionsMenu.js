import Menu from "../../ui/menu";
import GameState from "./GameState";

class OptionsMenu extends GameState {
  constructor() {
    super();
    this.buttons = [
      {
        name: "Sound: ON",
        action: () => {},
      },
      { name: "music: ON", action: () => {} },
      {
        name: "back",
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
    // this.prevState.render(context);

    this.menu.draw();

    // context.beginPath(); // Start a new path
    // context.rect(10, 20, 550, 200); // Add a rectangle to the current path
    // context.fill(); // Render the path
    // context.font = "48px serif";
    // context.fillStyle = "black";
    // context.fillText("pause menu", 100, 100);
    // context.font = "30px serif";
    // context.fillStyle = "yellow";
    // context.fillText("press 'P' to play", 100, 150);
    // context.font = "30px serif";
    // context.fillStyle = "yellow";
    // context.fillText("press 'Q' to quit", 100, 200);
  }
}

export default OptionsMenu;
