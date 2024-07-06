import GameEntity from "./GameEntity";
import * as THREE from "three";

class GenericShip extends GameEntity {
  constructor(position, width, height, depth, color) {
    super(position, "ship");

    this.health = 100;
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: color })
    );
    this.mesh.position.copy(position);
  }

  update = (deltaTime) => {
    // explode???
  };
  dispose = () => {
    this.mesh.material.dispose();
    this.mesh.geometry.dispose();
  };
}

export default GenericShip;
