import World from "../World/World";
import GameState from "./GameState";
import PauseMenu from "./PauseMenu";
import BasicShipController from "../Utils/controllers/BasicShipController";
import ThirdPersonShipCamera from "../Utils/cameras/ThirdPersonShipCamera";
import PlayerShip from "../World/PlayerShip";

export default class GameScene extends GameState {
  constructor() {
    super();

    this.gameEntities = [];
    this.world = new World(this);
    this.playerShip = new PlayerShip();
    this.game.camera.ship = this.playerShip;

    this.bullets = [];
    this.bulletSpeedFactor = 1.4;

    this.gameEntities.push(this.playerShip);

    this.controls = new BasicShipController(this.playerShip.instance, this);
    this.thirdPersonCamera = new ThirdPersonShipCamera(
      this.game.camera.instance,
      this.controls
    );
  }

  update(deltaTime) {
    this.disposeEntities();
    //check for state change
    if (this.game.userInput.controls["p"] == true) {
      let newState = new PauseMenu();
      newState.enterState();
      this.game.userInput.resetKeys();
    }

    this.gameEntities.forEach((entity) => {
      entity.update(deltaTime);
    });

    for (var i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i] === undefined) continue;
      if (this.bullets[i].alive === false) {
        this.bullets.splice(i, 1);
        continue;
      }

      this.bullets[i].position.add(
        this.bullets[i].direction.multiplyScalar(this.bulletSpeedFactor)
      );
    }

    this.game.camera.update();
    this.world.update(deltaTime);
    this.controls.update(deltaTime);
    this.thirdPersonCamera.update(deltaTime);
  }
  addToScene = (entity) => {
    this.gameEntities.push(entity);
    this.game.scene.add(entity.mesh);
  };

  disposeEntities = () => {
    const toBeDisposed = this.gameEntities.filter(
      (entity) => entity.shouldDispose
    );

    toBeDisposed.forEach((entity) => {
      this.game.scene.remove(entity.mesh);
      entity.dispose();
    });

    this.gameEntities = [
      ...this.gameEntities.filter((entity) => !entity.shouldDispose),
    ];
  };

  render(context) {
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

  exitState() {
    super.exitState();
    this.cleanUp();
  }
  cleanUp() {
    super.cleanUp();
    // delete all threejs objects made from world map
    this.gameEntities.forEach((entity) => {
      this.game.scene.remove(entity.mesh);
      entity.dispose();
    });
    // remove single player ship

    this.game.scene.remove(this.playerShip.instance);
    this.playerShip.geometry.dispose();
    this.playerShip.material.dispose();

    //remove all ships,
    this.world.ships.cleanUp();
    //remove stars

    this.world.stars.cleanUp();

    //remove light
    let amLight = this.world.environment.ambientLight;
    this.game.scene.remove(amLight);
    let diLight = this.world.environment.directionalLight;
    this.game.scene.remove(diLight);

    // remove sphere

    this.game.scene.remove(this.world.sphereBoundary.instance);
    this.world.sphereBoundary.instance.geometry.dispose();
    this.world.sphereBoundary.instance.material.dispose();
  }
}
