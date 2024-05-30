import Game from "../Game";
import * as THREE from "three";

export default class Stars {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;
    // this.time = this.game.time;
    // this.debug = this.game.debug;
    this.setParticles();
    this.setGeometry();
    this.setMaterials();
    this.setPoints();
  }
  setParticles() {
    this.particlesCount = 1200;
    this.positions = new Float32Array(this.particlesCount * 3);
    for (let i = 0; i < this.particlesCount; i++) {
      let i3 = i * 3;
      this.positions[i3] = (Math.random() - 0.5) * 20;
      this.positions[i3 + 1] = (Math.random() - 0.5) * 20;
      this.positions[i3 + 2] = (Math.random() - 0.5) * 20;
    }
  }
  setGeometry() {
    this.particlesGeometry = new THREE.BufferGeometry();
    this.particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );
  }
  setMaterials() {
    this.particlesMaterial = new THREE.PointsMaterial({
      color: "#b4e0ee",
      sizeAttenuation: true,
      size: 0.05,
    });
  }
  setPoints() {
    this.instance = new THREE.Points(
      this.particlesGeometry,
      this.particlesMaterial
    );
    this.scene.add(this.instance);
  }
}
