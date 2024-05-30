import Game from "../Game";
import Environment from "./Environment";
import * as THREE from "three";
import Stars from "./Stars";
export default class World {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;

    // set up objects in game
    this.environment = new Environment();
    // stars
    // boundary sphere

    this.stars = new Stars();

    // ships
  }
  update() {}
}
