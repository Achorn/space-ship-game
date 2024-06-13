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

    idealOffset.applyQuaternion(this.target.rotation);

    idealOffset.add(this.target.position);
  }
  calculateIdealLookat() {
    const idealOffset = new THREE.Vector3(0, 10, 50);

    idealOffset.applyQuaternion(this.target.rotation);

    idealOffset.add(this.target.position);
  }

  Update(timeElapsed) {
    const idealOffset = this.calculateIdealOffset();
    const idealLookat = this.calculateIdealLookat();

    const t = 1.0;
    t -= Math.pow(0.001, timeElapsed);

    this.currentPosition.lerp(idealOffset, t);
    this.currentLookat.lerp(idealLookat, t);

    this.camera.position.copy(this.currentPosition);
    this.camera.lookat(this.currentPosition);
  }
}
