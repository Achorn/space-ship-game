import * as THREE from "three";
import BasicCharacterControllerInput from "../BasicCharacterControllerInput";
import Game from "../../Game";
import Bullet from "../../../entities/Bullet";

export default class BasicShipController {
  constructor(target, gameScene) {
    this.gameScene = gameScene;
    this.game = new Game();
    this.position = new THREE.Vector3();
    this.input = new BasicCharacterControllerInput(
      this.game.userInput.controls
    );
    this.target = target;

    //control variables
    // variables
    this.speed = 0.01;
    this.matrix;
    this.x = new THREE.Vector3(1, 0, 0);
    this.y = new THREE.Vector3(0, 1, 0);
    this.z = new THREE.Vector3(0, 0, 1);
    this.rotMatrix = new THREE.Matrix4().makeBasis(this.x, this.y, this.z);
    this.planePosition = new THREE.Vector3(0, 2, 20);

    this.maxVelocity = 0.4;
    this.jawVelocity = 0;
    this.pitchVelocity = 0;
    this.turnVelocity = 0;

    this.planeSpeed = 0.05;
    this.speedModifier = 0.03;

    //guns variables
    this.canShoot = 0;
  }

  get Position() {
    return this.planePosition;
  }
  get Rotation() {
    return this.rotMatrix;
    // if (!this.target) {
    //   return new THREE.Quaternion();
    // }
    // return this.target.quaternion;
  }

  update(deltaTime) {
    this.input.update();
    // is shooting!!!
    if (this.input.keys.shoot && this.canShoot <= 0) {
      this.canShoot = 200;
      // Create bullet

      let direction = new THREE.Vector3(
        -1 * this.z.x,
        -1 * this.z.y,
        -1 * this.z.z
      );

      let bulletEntity = new Bullet(
        this.planePosition,
        direction,
        this.gameScene
      );
      this.gameScene.addToScene(bulletEntity);
    }
    this.canShoot -= deltaTime;

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
    this.target.matrixAutoUpdate = false;
    this.target.matrix.copy(this.matrix);
    this.target.position.x = this.planePosition.x;
    this.target.position.y = this.planePosition.y;
    this.target.position.z = this.planePosition.z;
    this.target.matrixWorldNeedsUpdate = true;
  }
  updatePlaneAxis(x, y, z, planePosition) {
    this.jawVelocity *= 0.95;
    this.pitchVelocity *= 0.95;
    this.turnVelocity *= 0.95;
    this.speedModifier *= 0.95;

    var leftAdjustment = 0.0015;

    //TODO no need to dpulicate left and right axes. reduce to one each
    if (this.input.keys.up) {
      this.pitchVelocity += Math.pow(this.input.keys.up, 2) * leftAdjustment;
    }
    if (this.input.keys.down) {
      this.pitchVelocity -= Math.pow(this.input.keys.down, 2) * leftAdjustment;
    }
    if (this.input.keys.left) {
      this.turnVelocity += Math.pow(this.input.keys.left, 2) * leftAdjustment;
    }
    if (this.input.keys.right) {
      this.turnVelocity -= Math.pow(this.input.keys.right, 2) * leftAdjustment;
    }

    var rightAdjustment = 0.003;

    if (this.input.keys.forward) {
      this.speedModifier -= this.input.keys.forward * rightAdjustment;
    }
    if (this.input.keys.backward) {
      this.speedModifier -= this.input.keys.backward * rightAdjustment;
    }

    if (this.input.keys.rotateLeft) {
      this.jawVelocity -= this.input.keys.rotateLeft * rightAdjustment;
    }
    if (this.input.keys.rotateRight) {
      this.jawVelocity -= this.input.keys.rotateRight * rightAdjustment;
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
    this.position.copy(planePosition);
  }
}
