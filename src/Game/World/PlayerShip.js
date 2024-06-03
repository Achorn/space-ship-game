import Game from "../Game";
import * as THREE from "three";

export default class PlayerShip {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;

    // variables
    this.speed = 0.01;
    this.matrix;

    // Methods
    this.setGeometry();
    this.setMaterials();
    this.setMesh();
    this.scene.add(this.instance);
    this.game.playerShip = this.instance;
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
    this.matrix = new THREE.Matrix4().multiply(
      new THREE.Matrix4().makeTranslation(
        this.instance.position.x,
        this.instance.position.y,
        this.instance.position.z
      )
    );
    // console.log(this.game.time.delta);
    // this.instance.position.x += 0.001 * this.game.time.delta;
    // this.instance.rotateZ(Math.PI * 0.01);
    // const direction = this.game.userInput.getDirection();
    // const deltaTime = this.game.time.delta;
    // if (direction) {
    //   console.log(this.angle);
    //   if (direction == "left") {
    //     this.angle -= 0.01;
    //   } else {
    //     this.angle += 0.01;
    //   }
    //   this.instance.rotation.y = -this.angle;
    // }
    // let [xd, zd] = this.getSides(this.speed, this.angle * 180);
    // this.instance.position.x += xd;
    // this.instance.position.z += zd;
  }
  draw() {}

  getSides = (hypotenuse, angle) => {
    let cosOfAngle = Math.cos((Math.PI / 180) * angle).toFixed(2);
    let sinOfAngle = Math.sin((Math.PI / 180) * angle).toFixed(2);
    let x = hypotenuse * cosOfAngle;
    let y = hypotenuse * sinOfAngle;
    return [x, y];
  };
}
