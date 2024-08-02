import GameState from "../GameState";

let lines = [
  "While visiting a friend, you see that someone has dumped a lot of trash in the local area.",
  "You decide to help out by blasting away the colorful spinning chunks floating in space... ",
  "Press the right shoulder button on your controller to fire",
  "When you're ready, press A to continue.",
];

class DialogState extends GameState {
  constructor() {
    super();
    this.selectedLineIndex = 0;
  }

  update(deltaTime) {
    if (this.game.userInput.controls["a"] == true) {
      if (this.selectedLineIndex === lines.length - 1) {
        this.game.stateStack.pop();
      } else {
        this.selectedLineIndex++;
      }
    }
    this.game.userInput.resetKeys();
  }

  render(context) {
    // context.fillStyle = "rgba(0,0,0,0.5)";
    // context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    let canvasHeight = this.game.canvas2d.height;
    let canvasWidth = this.game.canvas2d.width;
    let outerBoxHeight = 300;
    let outerBoxWidth = canvasWidth;
    context.fillStyle = "white";
    let outerStartingX = 0;
    let outerStartingY = canvasHeight - outerBoxHeight - 20;

    // context.fillRect(
    //   outerStartingX,
    //   outerStartingY,
    //   outerBoxWidth,
    //   outerBoxHeight
    // );

    //add container for text
    context.fillStyle = "rgba(255,255,255,.9)";
    let textBoxWidth = 800;

    // 3/8 ratio
    textBoxWidth = Math.min(textBoxWidth, canvasWidth);
    let textBoxHeight = (textBoxWidth * 3) / 8;

    let textBoxStartingX = canvasWidth / 2 - textBoxWidth / 2;

    let textBoxStartingY = outerStartingY;

    context.fillRect(
      textBoxStartingX,
      textBoxStartingY,
      textBoxWidth,
      textBoxHeight
    );
    // add text to container

    context.save();
    let px_size = (textBoxWidth / 26) | 0;
    let padding = (textBoxWidth / 20) | 0;
    //(canvas.width / 22) | 0

    context.font = "600 " + px_size + "px Helvetica";
    context.fillStyle = "black";
    let lineHeight = px_size + 10;

    let wrappedText = wrapText(
      context,
      lines[this.selectedLineIndex],
      textBoxStartingX,
      textBoxStartingY,
      textBoxWidth - padding - padding,
      lineHeight
    );
    context.textAlign = "start";
    context.textBaseline = "top";
    wrappedText.forEach(function (item) {
      // context.textBaseline = "middle";
      context.fillText(
        item.curLine,
        item.startingX + padding,
        item.startingY + padding
      );
    });
    context.restore();
  }
}

export default DialogState;

// @description: wrapText wraps HTML canvas text onto a canvas of fixed width
// @param ctx - the context for the canvas we want to wrap text on
// @param text - the text we want to wrap.

// @param maxWidth - the width at which we want line breaks to begin - i.e. the maximum width of the canvas.
// @param lineHeight - the height of each line, so we can space them below each other.
// @returns an array of [ lineText, x, y ] for all lines
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
