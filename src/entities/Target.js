import ExplosionEffect from "../effects/ExplosionEffect";
import GameEntity from "./GameEntity";
import * as THREE from "three";
class Target extends GameEntity {
  constructor(position, gameScene) {
    super(position, "target");
    this.life = 100;
    this.position = position;
    this.gameScene = gameScene;
    this.rotationAlterer = Math.random() * 0.5 + 0.5;
    this.load();
  }

  load = () => {
    const material = new THREE.MeshNormalMaterial();
    const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    this.mesh = new THREE.Mesh(geometry, material);
    this.gameScene.addToScene(this);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2;
    this.mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2;
    const collider = new THREE.Box3().setFromObject(this.mesh);
    this.collider = collider;
  };

  update = (deltaTime) => {
    this.mesh.rotation.x += deltaTime * 0.001 * this.rotationAlterer;
    this.mesh.rotation.y += deltaTime * 0.001 * this.rotationAlterer;
  };

  damage(amount) {
    this.life -= amount;

    if (this.life <= 0) {
      this.shouldDispose = true;
      const explosion = new ExplosionEffect(this.mesh.position, 1.8, "normal");
      this.gameScene.addToScene(explosion);
      this.gameScene.scoreBoard.addPoint();
    }
  }
  dispose = () => {
    this.mesh.material.dispose();
    this.mesh.geometry.dispose();
  };
}

export default Target;
