import { Mesh } from "three";
import Game from "../Game/Game";

class GameEntity {
  constructor(position, entityType) {
    this.game = new Game(); // access to entire game...
    this.position = position;
    this.mesh = new Mesh();
    this.collider;
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
