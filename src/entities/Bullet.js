import GameEntity from "./GameEntity";
import * as THREE from "three";
class Bullet extends GameEntity {
  constructor(position, angle) {
    super(position, "bullet");
    this.angle = angle;

    this.load();
  }

  load = () => {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    this.mesh.position.copy(this.position);
  };
  update = () => {};

  dispose = () => {
    this.mesh.material.dispose();
    this.mesh.geometry.dispose();
  };
}
export default Bullet;
