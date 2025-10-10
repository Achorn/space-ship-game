import * as THREE from "three";

export default class ThirdPersonShipCamera {
  constructor(camera, target) {
    this.camera = camera;
    this.target = target;

    this.currentPosition = new THREE.Vector3();
    this.currentLookat = new THREE.Vector3();
  }

  calculateIdealOffset() {
    const idealOffset = new THREE.Vector3(10, 30, -40);
    idealOffset.applyQuaternion(this.target.matrix);

    return idealOffset.add(this.target.position);
  }
  calculateIdealLookat() {
    const idealLookat = new THREE.Vector3(10, 10, 50);

    idealLookat.applyQuaternion(this.target.matrix);

    return idealLookat.add(this.target.position);
  }

  update(timeElapsed) {
    if (!this.target) return;
    const idealOffset = this.calculateIdealOffset();
    const idealLookat = this.calculateIdealLookat();
    // let t = 1.0;
    // t -= Math.pow(0.001, timeElapsed);

    // this.currentPosition.lerp(idealOffset, t);
    // this.currentLookat.lerp(idealLookat, t);
    this.camera.position.copy(idealOffset);

    this.camera.lookAt(idealLookat);
    const newMatrix = new THREE.Matrix4();
    newMatrix.copy(this.target.matrix);
    newMatrix.elements[12] = 0;
    newMatrix.elements[13] = 0;
    newMatrix.elements[14] = 0;

    const cameraMatrix = new THREE.Matrix4()
      // place camera in center of player ship
      .multiply(
        new THREE.Matrix4().makeTranslation(
          this.target.position.x,
          this.target.position.y,
          this.target.position.z
        )
      )
      // player rotation matrix
      .multiply(newMatrix)
      // angle camera down a little
      .multiply(new THREE.Matrix4().makeRotationX(-0.1))
      // pull camera behind player target
      .multiply(new THREE.Matrix4().makeTranslation(0, 0.5, 3));
    this.camera.matrixAutoUpdate = false;
    this.camera.matrix.copy(cameraMatrix);
    this.camera.matrixWorldNeedsUpdate = true;
  }
  // this.controls.update(); // for orbit controls not being used
  // }
}
