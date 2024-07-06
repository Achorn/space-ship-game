import * as THREE from "three";
import GameEntity from "../entities/GameEntity";

class ExplosionEffect extends GameEntity {
  constructor(position, size) {
    super(position, "general");
    this.size = size;
    this.currentDuration = 0.5;
    this.currentDuration = this.effectDuration;
    this.fireMesh = new THREE.Mesh();
    this.load();
  }

  load() {
    // const particleDe
  }

  update(deltTime) {}
  dispose() {}
}

export default ExplosionEffect;
