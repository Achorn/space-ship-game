import * as THREE from "three";
import BasicCharacterControllerInput from "../BasicCharacterControllerInput";

export default class BasicShipController {
  constructor(target) {
    this.position = new THREE.Vector3();
    this.input = new BasicCharacterControllerInput();
    this.target = target;
  }

  get position() {
    return this.position;
  }
  get rotation() {}
}
