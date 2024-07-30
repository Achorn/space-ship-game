import Target from "../../../entities/Target";
import * as THREE from "three";
class TargetLoader {
  constructor(gameScene) {
    this.gameScene = gameScene;
    this.loadTargets();
  }
  loadTargets = () => {
    this.target = new Target(new THREE.Vector3(1, -7, 1), this.gameScene);
    this.target = new Target(new THREE.Vector3(5, 2, -5), this.gameScene);
    this.target = new Target(new THREE.Vector3(8, 4, -2), this.gameScene);
    this.target = new Target(new THREE.Vector3(-7, 7, 1), this.gameScene);
    this.target = new Target(new THREE.Vector3(5, 1, 5), this.gameScene);
    this.target = new Target(new THREE.Vector3(8, -3, 2), this.gameScene);
    this.target = new Target(new THREE.Vector3(-7, -3, 5), this.gameScene);
    this.target = new Target(new THREE.Vector3(-5, -3, -2), this.gameScene);
  };
}

export default TargetLoader;
