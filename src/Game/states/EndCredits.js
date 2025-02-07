import GameState from "./GameState";

export default class EndCredits extends GameState {
  constructor() {
    super();
    this.init();
  }
  init() {
    // init image
    this.teaImage = new Image();
    this.teaImage.src = "/tea-time-2.jpg";
  }

  update(deltaTime) {
    // if button pressed,

    if (this.game.userInput.controls["start"] == true) {
      this.game.userInput.resetKeys();
      this.game.transitionController.transition({
        midAction: () => {
          while (this.game.stateStack.length > 1) {
            this.game.stateStack[this.game.stateStack.length - 1].exitState();
          }
        },
      });
    }
  }

  render(context) {
    let canvWidth = this.game.canvas2d.width;
    let canvHeight = this.game.canvas2d.height;

    //get padding for screen
    const padding = 50;

    // get container positions;

    let containerWidth = canvWidth - padding - padding;
    let containerHeight = canvHeight - padding - padding;

    // context.strokeStyle = "red";
    // context.strokeRect(padding, padding, containerWidth, containerHeight);

    // context.strokeRect(padding, padding, containerWidth, containerHeight);

    //get height for img and text  5/6th and 1/6th

    let imgHeight = (containerHeight * 5) / 6;
    let imgWidth = (imgHeight * 5) / 4;
    context.fillStyle = "#1b1b1b";
    // context.strokeRect(padding, padding, containerWidth, containerHeight);

    context.fillRect(0, 0, canvWidth, canvHeight);

    // context.fillStyle = "yellow";
    let textX = canvWidth / 2 - imgWidth / 2;
    let textY = padding + imgHeight;
    let textWidth = imgWidth;
    let textHeight = containerHeight - imgHeight;
    // context.fillRect(textX, textY, textWidth, textHeight);

    if (this.teaImage.complete)
      context.drawImage(
        this.teaImage,
        canvWidth / 2 - imgWidth / 2,
        padding,
        imgWidth,
        imgHeight
      );

    context.save();
    // context.font = "48px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    let px_size = (textWidth / 15) | 0;
    // this.lineHeight = this.px_size + 10;
    context.font = "650 " + px_size + "px serif";
    context.fillText(
      "- To Be Continued -",
      canvWidth / 2,
      textY + textHeight / 2
    );
    context.font = "24px serif";
    context.restore();
  }
}
