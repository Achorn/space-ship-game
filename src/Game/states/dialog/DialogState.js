import GameState from "../GameState";

let lines = [
  "HHi bud",
  "It's your friend Tommy!",
  "I'm so glad you've come to visit, and wow! you've already made it to our station.",
  "Actually you're a bit too early...",
  "Unfortunately, some debris has been tossed away in our neighborhood, and it's jamming our ability to open the docking bay to let you land...",
  "Could you help us out by blasting away these colorful chunks spinning around?",
  "You will??",
  "That's very helpful of you.",
  "You should be able to blast them by pressing the right shoulder button on your controller",
  "When you're ready, press A to continue.",
];

// wait this might turn into a cutscene state!!!which only happens in the game which could take care of pausing the game or haulting updates... unless its trivial animations!!!

// cut scene event. how to handle events... and dialog...

class DialogState extends GameState {
  constructor({ script, dialogFinishedAction }) {
    super();
    this.script = script;
    this.dialogFinishedAction = dialogFinishedAction;
    this.selectedLineIndex = 0;
    this.wrappedTextList = [];
    this.displayTextList = [];

    //container
    this.context = this.game.context2d;
    this.canvasHeight = this.game.canvas2d.height;
    this.canvasWidth = this.game.canvas2d.width;
    this.containerHeight = 300;
    this.containerWidth = this.canvasWidth;

    //text box
    this.textBoxMaxWidth = 800;
    this.textBoxWidth = Math.min(this.textBoxMaxWidth, this.canvasWidth);
    this.textBoxStartingX = this.canvasWidth / 2 - this.textBoxWidth / 2;
    this.textBoxStartingY = this.canvasHeight - this.containerHeight - 20;
    this.padding = (this.textBoxWidth / 20) | 0;

    //text
    this.px_size = (this.textBoxWidth / 26) | 0;
    this.lineHeight = this.px_size + 10;
    this.font = "600 " + this.px_size + "px Helvetica";
    this.wrappedTextArray = [""];
    this.updateNewDialog();

    //wrapped text... what will actually be animated
    this.animatedTextArray = [""];

    this.timoutId = null;
    this.state = "active"; //active - finished
    this.textSpeed = 35;
  }

  updateNewDialog() {
    this.state = "active";
    this.wrappedTextArray = wrapText(
      this.game.context2d,
      this.script[this.selectedLineIndex],
      this.textBoxStartingX,
      this.textBoxStartingY,
      this.textBoxWidth - this.padding - this.padding,
      this.lineHeight
    );
    this.animatedTextArray = [];

    for (let i = 0; i < this.wrappedTextArray.length; i++) {
      this.animatedTextArray.push("");
    }
    let charList = this.wrappedTextArray[0].curLine.split("");
    this.animateText(charList, 0);
  }
  animateText = (charList, i) => {
    let char = charList.splice(0, 1)[0];
    let prev = this.animatedTextArray[i];
    this.animatedTextArray[i] = !!prev ? prev + char : char;
    if (charList.length > 0) {
      this.timoutId = setTimeout(() => {
        this.animateText(charList, i);
      }, this.textSpeed);
    } else {
      if (this.animatedTextArray.length > i + 1) {
        i++;
        charList = this.wrappedTextArray[i].curLine.split("");
        this.animateText(charList, i);
      } else {
        this.state = "finished";
      }
    }
  };

  update(deltaTime) {
    if (this.game.userInput.controls["a"] == true) {
      if (this.state === "active") {
        // animation in progress
        clearTimeout(this.timoutId);
        for (let i = 0; i < this.animatedTextArray.length; i++) {
          this.animatedTextArray[i] = this.wrappedTextArray[i].curLine;
        }
        this.state = "finished";
      } else {
        //we should be finished!!
        if (this.selectedLineIndex === this.script.length - 1) {
          //last  dialog box
          // animation is finished
          this.game.stateStack.pop();
          this.dialogFinishedAction();
        } else {
          this.selectedLineIndex++;
          this.updateNewDialog();
        }
      }
    }
    this.game.userInput.resetKeys();

    /**
     * Container
     */
    this.canvasHeight = this.game.canvas2d.height;
    this.canvasWidth = this.game.canvas2d.width;
    this.containerWidth = this.canvasWidth;

    /**
     * TextBox
     */
    this.outerStartingY = this.canvasHeight - this.containerHeight - 20; //rename this to something more descriptive
    // 3/8 ratio
    this.textBoxWidth = Math.min(this.textBoxMaxWidth, this.canvasWidth);
    this.textBoxHeight = (this.textBoxWidth * 3) / 8;
    this.textBoxStartingX = this.canvasWidth / 2 - this.textBoxWidth / 2;
    this.textBoxStartingY = this.outerStartingY;
    this.padding = (this.textBoxWidth / 20) | 0;

    // TEXT
    this.px_size = (this.textBoxWidth / 26) | 0;
    this.lineHeight = this.px_size + 10;
    this.font = "600 " + this.px_size + "px Helvetica";
  }

  render(context) {
    // context.fillStyle = "rgba(0,0,0,0.5)";
    // context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    context.fillStyle = "white";
    context.fillStyle = "rgba(255,255,255,.7)";

    // Text Box
    context.fillRect(
      this.textBoxStartingX,
      this.textBoxStartingY,
      this.textBoxWidth,
      this.textBoxHeight
    );

    // text;
    // context.save();

    this.wrappedTextArray = wrapText(
      this.game.context2d,
      this.script[this.selectedLineIndex],
      this.textBoxStartingX,
      this.textBoxStartingY,
      this.textBoxWidth - this.padding - this.padding,
      this.lineHeight
    );
    this.wrappedTextArray.forEach((item, i) => {
      let text = this.animatedTextArray[i];
      let x = item.startingX + this.padding;
      let y = item.startingY + this.padding;

      // context.save();
      context.font = this.font;
      context.fillStyle = "black";

      context.textAlign = "start";
      context.textBaseline = "top";
      context.fillText(text, x, y);
      // context.restore();
    });
    // context.restore();
  }
}

export default DialogState;

// @description: wrapText wraps HTML canvas text onto a canvas of fixed width
// @param ctx - the context for the canvas we want to wrap text on
// @param text - the text we want to wrap.

// @param maxWidth - the width at which we want line breaks to begin - i.e. the maximum width of the canvas.
// @param lineHeight - the height of each line, so we can space them below each other.
// @returns an array of [ lineText, x, y ] for all lines

class DialogBox {
  // holds box and text and a little icon in the bottom right to animate what to do next...
  constructor() {
    // box =
    // text =
  }

  update() {
    // box.update()
    //  text.update()
  }

  draw() {
    //box.draw()
    // text.draw()
  }
}

const wrapText = function (
  ctx,
  text,
  startingX,
  startingY,
  maxWidth,
  lineHeight
) {
  let words = text.split(" ");
  let curLine = "";
  let testLine = "";
  let lineArray = [];
  for (var n = 0; n < words.length; n++) {
    testLine += `${words[n]} `;

    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lineArray.push({ curLine, startingX, startingY });
      startingY += lineHeight;
      curLine = `${words[n]} `;
      testLine = `${words[n]} `;
    } else {
      curLine += `${words[n]} `;
    }
    if (n === words.length - 1) {
      lineArray.push({ curLine, startingX, startingY });
    }
  }
  return lineArray;
};

class textBox {
  constructor(height, width, padding) {
    this.height = height;
    this.width = width;
    this.padding = padding;
  }
}

class Text {
  constructor() {}
}
