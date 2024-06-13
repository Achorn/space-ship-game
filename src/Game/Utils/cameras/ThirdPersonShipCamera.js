import * as THREE from "three";

export default class ThirdPersonShipCamera {
  constructor(camera, target) {
    this.camera = camera;
    this.target = target;

    this.currentPosition = new THREE.Vector3();
    this.currentLookat = new THREE.Vector3();
  }

  calculateIdealOffset() {
    const idealOffset = new THREE.Vector3(0, 30, -40);

    idealOffset.applyQuaternion(this.target.Rotation);

    return idealOffset.add(this.target.Position);
  }
  calculateIdealLookat() {
    const idealLookat = new THREE.Vector3(0, 10, 50);

    idealLookat.applyQuaternion(this.target.Rotation);

    return idealLookat.add(this.target.Position);
  }

  update(timeElapsed) {
    // console.log("updating?");
    // const idealOffset = this.calculateIdealOffset();
    // const idealLookat = this.calculateIdealLookat();
    // let t = 1.0;
    // t -= Math.pow(0.001, timeElapsed);
    // // console.log(idealOffset, idealLookat);
    // this.currentPosition.lerp(idealOffset, t);
    // this.currentLookat.lerp(idealLookat, t);
    // this.camera.position.copy(this.currentPosition);
    // this.camera.lookAt(this.currentPosition);

    // TODO decouple hardcoded third person camera controls
    // // {
    const cameraMatrix = new THREE.Matrix4()
      //   // place camera in center of player ship
      .multiply(
        new THREE.Matrix4().makeTranslation(
          this.target.planePosition.x,
          this.target.planePosition.y,
          this.target.planePosition.z
        )
      )
      // player rotation matrix
      .multiply(this.target.rotMatrix)
      // angle camera down a little
      .multiply(new THREE.Matrix4().makeRotationX(-0.2))
      // pull camera behind player target
      .multiply(new THREE.Matrix4().makeTranslation(0, 0.1, 3));
    this.camera.matrixAutoUpdate = false;
    this.camera.matrix.copy(cameraMatrix);
    this.camera.matrixWorldNeedsUpdate = true;
    // }
    // this.controls.update(); // for orbit controls not being used
  }
}
