import { cubeTexture } from "three/examples/jsm/nodes/Nodes.js";
import Game from "../Game";
import { gsap } from "gsap";
function delay(t, val) {
  return new Promise((resolve) => setTimeout(resolve, t, val));
}

// function transitionPromise()

class TransitionController {
  constructor() {
    this.game = new Game();
    this.userInput = this.game.userInput;
    this.selectedTransition = null;
    this.options = { alpha: 0 };
    this.alpha = 0;
  }

  // transitionIn, action, transitionOut
  transition = (action) => {
    // transition in
    // this.selectedTransition = new Transition();
    this.userInput.isActive = false;
    gsap.to(this.options, {
      alpha: 1,
      duration: 0.5,
      ease: "circ.in",
      onComplete: () => {
        console.log("halfway");
        action();
        gsap.to(this.options, {
          alpha: 0,
          duration: 0.5,
          ease: "circ.out",

          onComplete: () => {
            console.log("finished");

            this.userInput.isActive = true;
          },
        });
      },
    });
  };

  update(deltaTime) {
    this.draw(this.game.context2d);
  }
  draw(context) {
    context.save();
    context.beginPath();
    context.globalAlpha = this.options.alpha;
    context.rect(0, 0, this.game.canvas2d.width, this.game.canvas2d.height);
    context.fillStyle = "black";
    context.fill();
    context.restore();
  }
}

export default TransitionController;
