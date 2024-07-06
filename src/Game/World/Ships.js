import GenericShip from "../../entities/GenericShip";
import Game from "../Game";
import * as THREE from "three";

export default class Ships {
  constructor(gameScene) {
    this.gameScene = gameScene;
    this.game = new Game();
    this.scene = this.game.scene;

    // TODO: remove ship code and add them into their own files
    // const kingShip = new THREE.BoxGeometry(1.4, 0.6, 4);
    // const enemyMaterial = new THREE.MeshStandardMaterial({ color: "red" });
    // const teamMaterial = new THREE.MeshStandardMaterial({ color: "blue" });

    const big1Red = new GenericShip(
      new THREE.Vector3(-2, 0, -4),
      1.4,
      0.6,
      4,
      "purple"
    );
    this.gameScene.addToScene(big1Red);

    const big2blue = new GenericShip(
      new THREE.Vector3(2, 0, 4),
      1.4,
      0.6,
      4,
      "green"
    );
    this.gameScene.addToScene(big2blue);

    // const enemyShip = new THREE.Mesh(
    //   kingShip,
    //   new THREE.MeshStandardMaterial({ color: "red" })
    // );
    // const teamShip = new THREE.Mesh(kingShip, teamMaterial);
    // this.scene.add(enemyShip, teamShip);

    // teamShip.position.set(2, 0, 4);
    // enemyShip.position.set(-2, 0, -4);

    // const tansShipGeometry = new THREE.BoxGeometry(0.8, 0.25, 1.2);
    // const enemyTransShip1 = new THREE.Mesh(tansShipGeometry, enemyMaterial);
    // const teamTransShip1 = new THREE.Mesh(tansShipGeometry, teamMaterial);
    // const enemyTransShip2 = new THREE.Mesh(tansShipGeometry, enemyMaterial);
    // const teamTransShip2 = new THREE.Mesh(tansShipGeometry, teamMaterial);
    // this.scene.add(
    //   teamTransShip1,
    //   enemyTransShip1,
    //   teamTransShip2,
    //   enemyTransShip2
    // );
    // enemyTransShip1.position.set(0.5, -0.5, -4);
    // enemyTransShip2.position.set(-3, 1, -3);
    // teamTransShip1.position.set(0, -0, 2);
    // teamTransShip2.position.set(4, 1.5, 0);

    const smal1red = new GenericShip(
      new THREE.Vector3(0.5, -0.5, -4),
      0.8,
      0.25,
      1.2,
      "purple"
    );
    this.gameScene.addToScene(smal1red);

    const smal2red = new GenericShip(
      new THREE.Vector3(-3, 1, -3),
      0.8,
      0.25,
      1.2,
      "purple"
    );
    this.gameScene.addToScene(smal2red);

    const smal1blue = new GenericShip(
      new THREE.Vector3(0, -0, 2),
      0.8,
      0.25,
      1.2,
      "green"
    );
    this.gameScene.addToScene(smal1blue);

    const smal2blue = new GenericShip(
      new THREE.Vector3(4, 1.5, 0),
      0.8,
      0.25,
      1.2,
      "green"
    );
    this.gameScene.addToScene(smal2blue);

    // this.group = new THREE.Group();
    // this.group.add(
    //   enemyShip,
    //   teamShip,
    //   enemyTransShip1,
    //   enemyTransShip2,
    //   teamTransShip1,
    //   teamTransShip2
    // );
    // this.scene.add(this.group);
    // this.group.rotateY(Math.PI * 0.2);
    this.setParticles();
    this.setGeometry();
    this.setMaterials();
    this.setMesh();
  }
  setParticles() {}
  setGeometry() {}
  setMaterials() {}
  setMesh() {}

  cleanUp() {
    // this.scene.remove(this.group);
    // this.group.children.forEach((child) => {
    //   child.geometry.dispose();
    //   child.material.dispose();
    // });
  }
}
