import GameEntity from "./GameEntity";
import * as THREE from "three";
class Bullet extends GameEntity {
  constructor(position, angle) {
    super(position, "bullet");
    this.angle = angle;
    this.load();
    this.speed = 0.06;
    this.existance = 0;
  }

  load = () => {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    this.mesh.position.copy(this.position);
  };
  update = (deltaTime) => {
    this.existance += deltaTime;
    this.mesh.position.add(this.angle.multiplyScalar(this.speed * deltaTime));
    if (this.existance > 800) this.shouldDispose = true;
  };

  dispose = () => {
    this.mesh.material.dispose();
    this.mesh.geometry.dispose();
  };
}
export default Bullet;
