const { Vector3, Mesh } = require("three");

class GameEntity {
  constructor(position, entityType) {
    this.position = position;
    this.mesh = new Mesh();
    this.collider;
    this.entityType = entityType;
    this.shouldDispose = false;
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  // methods
  load = async () => {};
  update = (deltaT) => {};

  dispose = () => {};
}

export default GameEntity;
