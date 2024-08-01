import GameState from "../GameState";

class DialogState extends GameState {
  constructor() {
    super();
  }

  update(deltaTime) {
    // leave when button is pressed
    // what to present? menu with description and button?
    if (this.game.userInput.controls["a"] == true) {
      console.log("popping?");
      this.game.stateStack.pop();
    }
    this.game.userInput.resetKeys();
  }

  render(context) {
    // put words to screen!!!!
    // Add gradient
    let width = 1000;
    let px_size = 40;
    // Add gradient
    // let grd = context.createLinearGradient(0, , 800, 0);
    // grd.addColorStop(0, "#00a0ff");
    // grd.addColorStop(1, "#12cba6");
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    console.log(context.textAlign);
    // More text
    context.save();
    context.font = px_size + "px Helvetica";
    context.fillStyle = "white";
    let lineHeight = px_size + 10;

    let wrappedText = wrapText(
      context,
      "You're visiting a friend and see that someone has dumped a lot of trash in the local area. You decide to help out by blasting away the colorful waste chunks floating in space... press A to continue",
      20,
      40,
      width,
      lineHeight
    );
    context.textAlign = "start";
    wrappedText.forEach(function (item) {
      context.textBaseline = "middle";
      context.fillText(item[0], item[1], item[2]);
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
  // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  let words = text.split(" ");
  let line = ""; // This will store the text of the current line
  let testLine = ""; // This will store the text when we add a word, to test if it's too long
  let lineArray = []; // This is an array of lines, which the function will return

  // Lets iterate over each word
  for (var n = 0; n < words.length; n++) {
    // Create a test line, and measure it..
    testLine += `${words[n]} `;
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    // If the width of this test line is more than the max width
    if (testWidth > maxWidth && n > 0) {
      // Then the line is finished, push the current line into "lineArray"
      lineArray.push([line, startingX, startingY]);
      // Increase the line height, so a new line is started
      startingY += lineHeight;
      // Update line and test line to use this word as the first word on the next line
      line = `${words[n]} `;
      testLine = `${words[n]} `;
    } else {
      // If the test line is still less than the max width, then add the word to the current line
      line += `${words[n]} `;
    }
    // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
    if (n === words.length - 1) {
      lineArray.push([line, startingX, startingY]);
    }
  }
  // Return the line array
  return lineArray;
};
