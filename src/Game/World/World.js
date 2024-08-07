import Game from "../Game";
import Environment from "./Environment";
import Stars from "./Stars";
import BoundarySphere from "./BoundarySphere";
import Ships from "./Ships";

export default class World {
  constructor(gameScene) {
    this.gameScene = gameScene;
    this.game = new Game();
    this.scene = this.game.scene;

    // set up objects in game

    this.stars = new Stars();
    this.sphereBoundary = new BoundarySphere();
    this.ships = new Ships(gameScene);
    // this.game.camera.instance,
    // this.playerShip.instance
    // );
    this.environment = new Environment();
  }
  update(elapsedTime) {
    // this.playerShip.update();
    // this.thirPersonCamera.update(elapsedTime);
  }
}
