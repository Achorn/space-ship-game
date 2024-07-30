import GameEntity from "./GameEntity";

class Target extends GameEntity {
  constructor(position, gameScene) {
    super(position, "ship");
    this.load();
  }

  load = () => {};

  update = () => {};
  dispose = () => {};
}

export default Target;
