import * as THREE from "three";
import GameEntity from "../entities/GameEntity";
import { randomIntInRange, randomSin } from "../utils/MathUtils";

class ExplosionEffect extends GameEntity {
  constructor(position, size) {
    super(position, "general");
    this.size = size;
    this.effectDuration = 0.4;
    this.currentDuration = this.effectDuration;
    this.fireMesh = new THREE.Mesh();
    this.load();
  }

  load = () => {
    const particleGeometry = new THREE.DodecahedronGeometry(this.size, 0);
    const totalParticles = randomIntInRange(7, 13);
    const fireMaterial = new THREE.MeshPhongMaterial({ color: 0xff4500 });

    for (let i = 0; i < totalParticles; i++) {
      const particleAngle = Math.random() * Math.PI * 2;
      const fireGeometry = particleGeometry.clone();
      const particleSize =
        0.3 * this.size + Math.random() * this.size * 0.4 * randomSin();

      fireGeometry.scale(particleSize, particleSize, particleSize);
      fireGeometry.rotateX(Math.random() * Math.PI);
      fireGeometry.rotateY(Math.random() * Math.PI);
      fireGeometry.rotateZ(Math.random() * Math.PI);
      const fireParticle = new THREE.Mesh(fireGeometry, fireMaterial);

      fireParticle.userData = {
        angle: particleAngle,
        speed: 0.5 + Math.random() * 2.5,
      };
      this.fireMesh.add(fireParticle);
    }
    this.mesh.add(this.fireMesh);
  };

  update = (deltaTime) => {
    deltaTime = deltaTime * 0.001;
    this.currentDuration -= deltaTime;
    if (this.currentDuration <= 0) {
      this.shouldDispose = true;
      return;
    }

    const scale = this.currentDuration / this.effectDuration;
    this.fireMesh.children.forEach((element) => {
      const angle = element.userData["angle"];
      const speed = element.userData["speed"];
      const computedMovement = new THREE.Vector3(
        speed * Math.sin(angle) * deltaTime,
        speed * Math.cos(angle) * deltaTime,
        0
      );
      element.scale.set(scale, scale, scale);
      element.position.add(computedMovement);
    });
  };
  dispose = () => {
    this.fireMesh.children.forEach((element) => {
      element.material.dispose();
      element.geometry.dispose();
      this.fireMesh.remove(element);
    });
    this.mesh.remove(this.fireMesh);
  };
}

export default ExplosionEffect;
