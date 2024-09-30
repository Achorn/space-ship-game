import { Mesh } from "three";
import Game from "../Game/Game";

class GameEntity {
  constructor(position, entityType) {
    this.game = new Game(); // access to entire game...
    this.Ammo = this.game.ammoPhysics.Ammo;
    this.position = position;
    this.quat = { x: 0, y: 0, z: 0, w: 1 };
    this.mass = 0;

    this.mesh = new Mesh();

    this.entityType = entityType;
    this.shouldDispose = false;
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  // methods
  load = () => {};
  update = (deltaTime) => {};
  dispose = () => {};
}

export default GameEntity;
