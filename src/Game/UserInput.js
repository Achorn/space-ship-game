export default class UserInput {
  constructor() {
    this.controls = {};
    this.setListeners();

    this.maxVelocity = 0.4;
    this.jawVelocity = 0;
    this.pitchVelocity = 0;
    this.turnVelocity = 0;

    this.planeSpeed = 0.03;
    this.speedModifier = 0.03;
  }

  setListeners() {
    document.addEventListener("keydown", (e) => {
      this.controls[e.key.toLowerCase()] = true;
      console.log(e.key);
    });
    document.addEventListener(
      "keyup",
      (e) => (this.controls[e.key.toLowerCase()] = false)
    );
  }
  updatePlaneAxis(x, y, z, planePosition, camera) {
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

    if (this.controls["arrowup"]) {
      // ship speed modifier
      this.speedModifier += 0.0025;
    }
    if (this.controls["arrowdown"]) {
      this.speedModifier -= 0.0025;
    }

    if (this.controls["arrowleft"]) {
      // ship barrel rolling
      this.jawVelocity += 0.0025;
    }
    if (this.controls["arrowright"]) {
      this.jawVelocity -= 0.0025;
    }

    // turn up and down
    if (this.controls["s"]) {
      this.pitchVelocity += 0.0025;
    }
    if (this.controls["w"]) {
      this.pitchVelocity -= 0.0025;
    }

    // turn left and right
    if (this.controls["a"]) {
      this.turnVelocity += 0.0025;
    }
    if (this.controls["d"]) {
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

  resetKeys() {
    this.controls = {};
  }
}
