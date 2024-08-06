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
    this.wrappedTextArray = wrapText(
      this.game.context2d,
      lines[this.selectedLineIndex],
      this.textBoxStartingX,
      this.textBoxStartingY,
      this.textBoxWidth - this.padding - this.padding,
      this.lineHeight
    );
  }

  updateNewDialog() {
    this.selectedLineIndex++;
    console.log("udpateing wraper");
    this.wrappedTextArray = wrapText(
      this.game.context2d,
      lines[this.selectedLineIndex],
      this.textBoxStartingX,
      this.textBoxStartingY,
      this.textBoxWidth - this.padding - this.padding,
      this.lineHeight
    );
    console.log(this.wrappedTextArray);
  }

  update(deltaTime) {
    if (this.game.userInput.controls["a"] == true) {
      if (this.selectedLineIndex === lines.length - 1) {
        this.game.stateStack.pop();
      } else {
        this.updateNewDialog(); // this.wrappedTextList = this.animateText();
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

    this.wrappedTextArray = wrapText(
      this.game.context2d,
      lines[this.selectedLineIndex],
      this.textBoxStartingX,
      this.textBoxStartingY,
      this.textBoxWidth - this.padding - this.padding,
      this.lineHeight
    );
  }

  render(context) {
    // context.fillStyle = "rgba(0,0,0,0.5)";
    // context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    context.fillStyle = "white";
    context.fillStyle = "rgba(255,255,255,.9)";

    // Text Box
    context.fillRect(
      this.textBoxStartingX,
      this.textBoxStartingY,
      this.textBoxWidth,
      this.textBoxHeight
    );

    // text;
    // context.save();

    context.font = this.font;
    context.fillStyle = "black";

    context.textAlign = "start";
    context.textBaseline = "top";
    // this.wrappedTextArray = wrapText(
    //   this.game.context2d,
    //   lines[this.selectedLineIndex],
    //   this.textBoxStartingX,
    //   this.textBoxStartingY,
    //   this.textBoxWidth - this.padding - this.padding,
    //   this.lineHeight
    // );
    this.wrappedTextArray.forEach((item) => {
      context.fillText(
        item.curLine,
        item.startingX + this.padding,
        item.startingY + this.padding
      );
    });
    // context.restore();
  }
  // animateText = (charList) => {
  //   let char = charList.splice(0, 1)[0];
  //   this.displayText += char;

  //   if (charList.length > 0) {
  //     setTimeout(function () {
  //       this.animateText(charList);
  //     }, 100);
  //   }
  // };
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
  console.log(ctx);
  let words = text.split(" ");
  let curLine = "";
  let testLine = "";
  let lineArray = [];
  // console.log(startingX, startingY, maxWidth, lineHeight);
  for (var n = 0; n < words.length; n++) {
    testLine += `${words[n]} `;
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    // console.log(testWidth, maxWidth);
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
