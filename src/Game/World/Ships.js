import Game from "../Game";
import * as THREE from "three";

export default class Ships {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;

    // TODO: remove ship code and add them into their own files
    const kingShip = new THREE.BoxGeometry(1.4, 0.6, 4);
    const enemyMaterial = new THREE.MeshStandardMaterial({ color: "red" });
    const teamMaterial = new THREE.MeshStandardMaterial({ color: "blue" });
    const enemyShip = new THREE.Mesh(kingShip, enemyMaterial);
    const teamShip = new THREE.Mesh(kingShip, teamMaterial);
    this.scene.add(enemyShip, teamShip);

    teamShip.position.set(2, 0, 4);
    enemyShip.position.set(-2, 0, -4);

    const tansShipGeometry = new THREE.BoxGeometry(0.8, 0.25, 1.2);
    const enemyTransShip1 = new THREE.Mesh(tansShipGeometry, enemyMaterial);
    const teamTransShip1 = new THREE.Mesh(tansShipGeometry, teamMaterial);
    const enemyTransShip2 = new THREE.Mesh(tansShipGeometry, enemyMaterial);
    const teamTransShip2 = new THREE.Mesh(tansShipGeometry, teamMaterial);
    this.scene.add(
      teamTransShip1,
      enemyTransShip1,
      teamTransShip2,
      enemyTransShip2
    );
    enemyTransShip1.position.set(0.5, -0.5, -4);
    enemyTransShip2.position.set(-3, 1, -3);
    teamTransShip1.position.set(0, -0, 2);
    teamTransShip2.position.set(4, 1.5, 0);

    const heroShip = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const heroMaterial = new THREE.MeshStandardMaterial({ color: "orange" });
    const heroMesh = new THREE.Mesh(heroShip, heroMaterial);
    this.scene.add(heroMesh);
    // heroMesh.position.set(-10, 0, 0);

    // heroMesh.add(camera);
    // adding camera to hero mesh instead of world
    // camera.rotateY(-Math.PI * 0.5);
    // camera.target = heroMesh;
    // camera.rotateX(-Math.PI * 0.05);

    // camera.position.x -= 3;
    // camera.position.y += 0.7;

    //update player
    // heroMesh.position.x += deltaTime;
    // if (heroMesh.position.x > 10) heroMesh.position.x = -10;

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
