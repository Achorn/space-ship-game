import World from "../World/World";
import GameState from "./GameState";
import PauseMenu from "./PauseMenu";
import BasicShipController from "../Utils/controllers/BasicShipController";
import ThirdPersonShipCamera from "../Utils/cameras/ThirdPersonShipCamera";

export default class GameWorld extends GameState {
  constructor() {
    super();
    this.world = new World();
    this.game.camera.ship = this.world.playerShip;

    this.controls = new BasicShipController(this.world.playerShip.instance);
    this.thirdPersonCamera = new ThirdPersonShipCamera(
      this.game.camera.instance,
      this.controls
    );
  }

  update(deltaTime) {
    if (this.game.userInput.controls["p"] == true) {
      let newState = new PauseMenu();
      newState.enterState();
      this.game.userInput.resetKeys();
    }
    this.game.camera.update();
    this.world.update(deltaTime);
    this.controls.update(deltaTime);
    this.thirdPersonCamera.update(deltaTime);
  }

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

    //Traverse entire scene (maybe traverse world group in future)
    // this.game.scene.traverse((child) => {
    //   //dispose mesh
    //   //dispose geometry
    //   if (child instanceof THREE.Mesh) {
    //     console.log(child);
    //     child.geometry.dispose();

    //     for (const key in child.material) {
    //       console.log(key);
    //       const value = child.material[key];
    //       if (value && typeof value.dispose === "function") {
    //         value.dispose();
    //       }
    //     }
    //   }
    // });
    // r

    // remove single player ship

    this.game.scene.remove(this.world.playerShip.instance);
    this.world.playerShip.geometry.dispose();
    this.world.playerShip.material.dispose();

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
