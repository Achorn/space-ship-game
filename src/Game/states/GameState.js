import Game from "../Game";

export default class GameState {
  constructor() {
    this.game = new Game();
    this.prevState = null;
  }

  update(deltaTime) {}

  render(context) {}

  enterState() {
    if (this.game.stateStack.length > 1) {
      this.prevState = this.game.stateStack[this.game.stateStack.length - 1];
    }
    this.game.stateStack.push(this);
  }

  exitState() {
    this.game.stateStack.pop();
  }
  cleanUp() {}
}
