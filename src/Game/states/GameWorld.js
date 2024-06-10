import World from "../World/World";
import GameState from "./GameState";
import PauseMenu from "./PauseMenu";

export default class GameWorld extends GameState {
  constructor() {
    super();

    this.world = new World();
    this.game.camera.ship = this.world.playerShip;
  }

  update(deltaTime, actions) {
    if (actions["p"] == true) {
      let newState = new PauseMenu();
      newState.enterState();
      this.game.userInput.resetKeys();
    }
    this.game.camera.update();
    this.world.update();
  }

  render(context) {
    //draw yellow background
    // context.beginPath();
    // context.fillStyle = "#ff6";
    // context.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw blue triangle
    context.beginPath();
    context.fillStyle = "blue";
    context.moveTo(20, 20);
    context.lineTo(180, 20);
    context.lineTo(130, 130);
    context.closePath();
    context.fill();

    context.font = "48px serif";
    context.fillStyle = "green";
    context.fillText("FUN GAMEPLAY", 50, 100);

    context.font = "24px serif";
    context.fillStyle = "blue";
    context.fillText("press 'p' to pause", 100, 200);
  }
}
