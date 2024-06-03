import Game from "../Game";
import * as THREE from "three";

export default class PlayerShip {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;

    // variables
    this.speed = 0.01;
    this.matrix;
    this.x = new THREE.Vector3(1, 0, 0);
    this.y = new THREE.Vector3(0, 1, 0);
    this.z = new THREE.Vector3(0, 0, 1);
    this.rotMatrix = new THREE.Matrix4().makeBasis(this.x, this.y, this.z);
    this.planePosition = new THREE.Vector3(0, 2, 20);
    // Methods
    this.setGeometry();
    this.setMaterials();
    this.setMesh();
    this.scene.add(this.instance);
    this.game.playerShip = this.instance;
  }
  setGeometry() {
    this.geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    // this.geometry = new THREE.SphereGeometry(0.4);
  }
  setMaterials() {
    this.material = new THREE.MeshStandardMaterial({ color: "orange" });
  }
  setMesh() {
    this.instance = new THREE.Mesh(this.geometry, this.material);
    // this.instance.position.x = -8;
    this.matrix = new THREE.Matrix4().makeTranslation(
      this.instance.position.x,
      this.instance.position.y,
      this.instance.position.z
    );
  }

  update() {
    this.game.userInput.updatePlaneAxis(
      this.x,
      this.y,
      this.z,
      this.planePosition,
      this.game.camera
    );
    this.rotMatrix = new THREE.Matrix4().makeBasis(this.x, this.y, this.z);

    this.matrix = new THREE.Matrix4().multiply(
      // planes position
      new THREE.Matrix4()
        .makeTranslation(
          this.planePosition.x,
          this.planePosition.y,
          this.planePosition.z
        )
        //planes rotation
        .multiply(this.rotMatrix)
    );
    this.instance.matrixAutoUpdate = false;
    this.instance.matrix.copy(this.matrix);
    this.instance.matrixWorldNeedsUpdate = true;
  }
  draw() {}
}
