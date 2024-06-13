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

    this.maxVelocity = 0.4;
    this.jawVelocity = 0;
    this.pitchVelocity = 0;
    this.turnVelocity = 0;

    this.planeSpeed = 0.03;
    this.speedModifier = 0.03;
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
    this.updatePlaneAxis(this.x, this.y, this.z, this.planePosition);
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
  updatePlaneAxis(x, y, z, planePosition) {
    this.jawVelocity *= 0.95;
    this.pitchVelocity *= 0.95;
    this.turnVelocity *= 0.95;
    this.speedModifier *= 0.95;

    if (Math.abs(this.jawVelocity) > this.maxVelocity) {
      this.jawVelocity = Math.sign(this.jawVelocity) * this.maxVelocity;
    }
    if (Math.abs(this.pitchVelocity) > this.maxVelocity) {
      this.pitchVelocity = Math.sign(this.pitchVelocity) * this.maxVelocity;
    }
    if (Math.abs(this.turnVelocity) > this.maxVelocity) {
      this.turnVelocity = Math.sign(this.turnVelocity) * this.maxVelocity;
    }
    if (Math.abs(this.speedModifier) > this.maxVelocity) {
      this.speedModifier = Math.sign(this.speedModifier) * this.maxVelocity;
    }

    if (this.game.userInput.controls["arrowup"]) {
      // ship speed modifier
      this.speedModifier += 0.0025;
    }
    if (this.game.userInput.controls["arrowdown"]) {
      this.speedModifier -= 0.0025;
    }

    if (this.game.userInput.controls["arrowleft"]) {
      // ship barrel rolling
      this.jawVelocity += 0.0025;
    }
    if (this.game.userInput.controls["arrowright"]) {
      this.jawVelocity -= 0.0025;
    }

    // turn up and down
    if (this.game.userInput.controls["s"]) {
      this.pitchVelocity += 0.0025;
    }
    if (this.game.userInput.controls["w"]) {
      this.pitchVelocity -= 0.0025;
    }

    // turn left and right
    if (this.game.userInput.controls["a"]) {
      this.turnVelocity += 0.0025;
    }
    if (this.game.userInput.controls["d"]) {
      this.turnVelocity -= 0.0025;
    }

    x.applyAxisAngle(y, this.turnVelocity);
    z.applyAxisAngle(y, this.turnVelocity);

    x.applyAxisAngle(z, this.jawVelocity);
    y.applyAxisAngle(z, this.jawVelocity);

    y.applyAxisAngle(x, this.pitchVelocity);
    z.applyAxisAngle(x, this.pitchVelocity);

    x.normalize();
    y.normalize();
    z.normalize();

    planePosition.add(
      z.clone().multiplyScalar(-(this.planeSpeed + this.speedModifier))
    );
  }
  draw() {}
}
