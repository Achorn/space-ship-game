import Game from "../Game";

class TransitionController {
  constructor() {
    this.game = new Game();
    this.userInput = this.game.userInput;
  }

  transition = (transitionIn, action, transitionOut) => {
    // transition in
    // do transition with a sertain amount of time...
    // do action
  };
}

export default TransitionController;
