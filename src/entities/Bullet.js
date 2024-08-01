import ExplosionEffect from "../effects/ExplosionEffect";
import GameEntity from "./GameEntity";
import * as THREE from "three";
class Bullet extends GameEntity {
  constructor(position, angle, gameScene) {
    super(position, "bullet");
    this.gameScene = gameScene;
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
    this.collider = new THREE.Box3()
      .setFromObject(this.mesh)
      .getBoundingSphere(new THREE.Sphere(this.mesh.position));
  };

  update = (deltaTime) => {
    this.existance += deltaTime;
    this.mesh.position.add(this.angle.multiplyScalar(this.speed * deltaTime));
    const colliders = this.gameScene.gameEntities.filter(
      (c) =>
        c.collider &&
        c !== this &&
        c.entityType !== "player" &&
        c.collider.intersectsSphere(this.collider)
    );

    //if collision detected. its no longer needed and should be removed
    if (colliders.length) {
      this.shouldDispose = true;

      // explode!!!
      const explosion = new ExplosionEffect(this.mesh.position, 1);
      this.gameScene.addToScene(explosion);

      //collide with target?
      const enemies = colliders.filter((c) => c.entityType === "target");
      if (enemies.length) {
        enemies[0].damage(30);
      }
    }

    if (this.existance > 800) this.shouldDispose = true;
  };

  dispose = () => {
    this.mesh.material.dispose();
    this.mesh.geometry.dispose();
  };
}
export default Bullet;
