import Game from "../Game";
import Environment from "./Environment";
import * as THREE from "three";
import Stars from "./Stars";
import BoundarySphere from "./BoundarySphere";
import Ships from "./Ships";
export default class World {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;

    // set up objects in game

    this.stars = new Stars();
    this.sphereBoundary = new BoundarySphere();
    this.ships = new Ships();
    this.environment = new Environment();
  }
  update() {}
}
