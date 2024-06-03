export default class UserInput {
  constructor() {
    this.controls = {};
    this.setListeners();

    this.jawVelocity = 0;
    this.pitchVelocity = 0;
    this.turnVelocity = 0;

    this.planeSpeed = 0.04;
  }

  setListeners() {
    document.addEventListener("keydown", (e) => {
      this.controls[e.key.toLowerCase()] = true;
    });
    document.addEventListener(
      "keyup",
      (e) => (this.controls[e.key.toLowerCase()] = false)
    );
  }
  updatePlaneAxis(x, y, z, planePosition, camera) {
    this.jawVelocity = 0;
    this.pitchVelocity = 0;
    this.turnVelocity = 0;

    if (this.controls["arrowleft"]) {
      this.jawVelocity = 0.025;
    }
    if (this.controls["arrowright"]) {
      this.jawVelocity = -0.025;
    }

    if (this.controls["s"]) {
      this.pitchVelocity = 0.025;
    }
    if (this.controls["w"]) {
      this.pitchVelocity = -0.025;
    }
    if (this.controls["a"]) {
      this.turnVelocity = 0.025;
    }
    if (this.controls["d"]) {
      this.turnVelocity = -0.025;
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

    planePosition.add(z.clone().multiplyScalar(-this.planeSpeed));
  }
}
