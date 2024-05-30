import Game from "../Game";
import * as THREE from "three";

export default class Ships {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;
    // this.time = this.game.time;
    // this.debug = this.game.debug;

    const kingShip = new THREE.BoxGeometry(1.4, 0.6, 4);
    const enemyMaterial = new THREE.MeshStandardMaterial({ color: "red" });
    const teamMaterial = new THREE.MeshStandardMaterial({ color: "blue" });
    const enemyShip = new THREE.Mesh(kingShip, enemyMaterial);
    const teamShip = new THREE.Mesh(kingShip, teamMaterial);
    this.scene.add(enemyShip, teamShip);

    teamShip.position.set(2, 0, 4);
    enemyShip.position.set(-2, 0, -4);

    this.setParticles();
    this.setGeometry();
    this.setMaterials();
    this.setMesh();
  }
  setParticles() {}
  setGeometry() {}
  setMaterials() {}
  setMesh() {}
}
