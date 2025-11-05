import { Mesh } from "three";
import Game from "../Game/Game";

class GameEntity {
  constructor(position, entityType, ammo) {
    this.Ammo = ammo;
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
