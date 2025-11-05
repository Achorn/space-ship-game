import * as THREE from "three";

export default class ShipController {
  constructor() {
    this.position = new THREE.Vector3();
    this.speed = 0.01;
    this.matrix;
    this.x = new THREE.Vector3(1, 0, 0);
    this.y = new THREE.Vector3(0, 1, 0);
    this.z = new THREE.Vector3(0, 0, 1);
    this.rotMatrix = new THREE.Matrix4().makeBasis(this.x, this.y, this.z);
    this.planePosition = new THREE.Vector3(0, 0, 0);

    this.maxVelocity = 0.4;
    this.jawVelocity = 0;
    this.pitchVelocity = 0;
    this.turnVelocity = 0;

    this.planeSpeed = 0.01;
    this.speedModifier = 0.03;

    //guns variables
    this.canShoot = 0;
  }

  get Position() {
    return this.planePosition;
  }
  get Rotation() {
    return this.rotMatrix;
  }
  getPosition() {
    return { position: this.position, matrix: this.matrix };
  }

  update(ship, input, deltaTime) {
    if (input.shoot && this.canShoot <= 0) {
      // if (input.shoot) {
      this.canShoot = 200;
      // Create bullet

      let direction = new THREE.Vector3(
        -1 * this.z.x,
        -1 * this.z.y,
        -1 * this.z.z
      );
      // let bulletEntity = new BulletServer(this.planePosition, direction);
    }
    this.canShoot -= deltaTime;

    // updates this.position
    this.updatePlaneAxis(this.x, this.y, this.z, this.planePosition, input);
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
    ship.matrix.copy(this.matrix);
    ship.position.x = this.planePosition.x;
    ship.position.y = this.planePosition.y;
    ship.position.z = this.planePosition.z;
    ship.x = this.x;
    ship.y = this.y;
    ship.z = this.z;
    ship.rotMatrix = this.rotMatrix;
  }
  updatePlaneAxis(x, y, z, planePosition, input) {
    this.jawVelocity *= 0.93;
    this.pitchVelocity *= 0.93;
    this.turnVelocity *= 0.93;
    this.speedModifier *= 0.93;
    var leftAdjustment = 0.0015;
    //TODO no need to dpulicate left and right axes. reduce to one each
    if (input.up) {
      this.pitchVelocity += Math.pow(input.up, 2) * leftAdjustment;
    }
    if (input.down) {
      this.pitchVelocity -= Math.pow(input.down, 2) * leftAdjustment;
    }
    if (input.left) {
      this.turnVelocity += Math.pow(input.left, 2) * leftAdjustment;
    }
    if (input.right) {
      this.turnVelocity -= Math.pow(input.right, 2) * leftAdjustment;
    }
    var rightAdjustment = 0.003;
    if (input.forward) {
      this.speedModifier -= input.forward * rightAdjustment;
    }
    if (input.backward) {
      this.speedModifier -= input.backward * rightAdjustment;
    }
    if (input.rotateLeft) {
      this.jawVelocity -= input.rotateLeft * rightAdjustment;
    }
    if (input.rotateRight) {
      this.jawVelocity -= input.rotateRight * rightAdjustment;
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
}
