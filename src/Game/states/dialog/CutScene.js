import Game from "../../Game";
import GameState from "../GameState";

class CutScene extends GameState {
  constructor(dialog) {
    this.game = new Game();
    this.dialog = dialog;
    // dialog = [{ text: string, name: string, speed: num }];

    let dialog = new Dialog();
  }

  init() {
    Dialog;
  }
  update() {}
  draw() {}
}

class Dialog {
  constructor(text) {
    this.text = text;
  }

  init() {
    //get text line calculations
  }

  update() {
    // if input a = true
  }
  draw() {}
}

export default CutScene;
