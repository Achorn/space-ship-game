import * as THREE from "three";
import Game from "./Game";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class Camera {
  constructor() {
    this.game = new Game();
    this.sizes = this.game.sizes;
    this.scene = this.game.scene;
    this.canvas = this.game.canvas;

    this.setInstance();
    // this.setOrbitControls();
  }
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    // this.instance.position.set(6, 4, 8);
    this.instance.position.set(-4, 4, 0);
    this.instance.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.instance);
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
  update() {
    // TODO decouple hardcoded third person camera controls
    // // {
    // const cameraMatrix = new THREE.Matrix4()
    //   // place camera in center of player ship
    //   .multiply(
    //     new THREE.Matrix4().makeTranslation(
    //       this.ship.planePosition.x,
    //       this.ship.planePosition.y,
    //       this.ship.planePosition.z
    //     )
    //   )
    //   // player rotation matrix
    //   .multiply(this.ship.rotMatrix)
    //   //angle camera down a little
    //   .multiply(new THREE.Matrix4().makeRotationX(-0.2))
    //   // pull camera behind player ship
    //   .multiply(new THREE.Matrix4().makeTranslation(0, 0.1, 3));
    // this.instance.matrixAutoUpdate = false;
    // this.instance.matrix.copy(cameraMatrix);
    // this.instance.matrixWorldNeedsUpdate = true;
    //}
    // this.controls.update(); // for orbit controls not being used
  }
}
