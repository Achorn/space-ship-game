import Game from "../Game";
import * as THREE from "three";

export default class PlayerShip {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;

    this.velocity = 0.001;

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

    this.setGeometry();
    this.setMaterials();
    this.setMesh();
    this.scene.add(this.instance);
    this.game.playerShip = this.instance;
  }
  setGeometry() {
    this.geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  }
  setMaterials() {
    this.material = new THREE.MeshStandardMaterial({ color: "orange" });
  }
  setMesh() {
    this.instance = new THREE.Mesh(this.geometry, this.material);
  }

  update() {
    // console.log(this.game.time.delta);
    // this.instance.position.x += 0.001 * this.game.time.delta;
    // this.instance.rotateZ(Math.PI * 0.01);
  }
  draw() {}
}
