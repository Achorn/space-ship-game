import World from "../World/World";
import GameState from "./GameState";
import PauseMenu from "./PauseMenu";
import BasicShipController from "../Utils/controllers/BasicShipController";
import ThirdPersonShipCamera from "../Utils/cameras/ThirdPersonShipCamera";
import PlayerShip from "../World/PlayerShip";
import TargetLoader from "./gameScene/targetLoader";
import DialogState from "./dialog/DialogState";
import Game from "../Game";

class GameScene extends GameState {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.gameEntities = [];
    this.world = new World(this);
    this.playerShip = new PlayerShip();
    this.game.camera.ship = this.playerShip;
    new TargetLoader(this); //call once and then it dissapears???
    this.bullets = [];
    this.bulletSpeedFactor = 1.4;
    this.gameEntities.push(this.playerShip);

    this.controls = new BasicShipController(this.playerShip.instance, this);
    this.thirdPersonCamera = new ThirdPersonShipCamera(
      this.game.camera.instance,
      this.controls
    );
    this.scoreBoard = new ScoreBoard(
      this.gameEntities.filter(
        (entity) => entity.entityType === "target"
      ).length
    );
  }

  update(deltaTime) {
    this.disposeEntities();
    //check for state change

    if (this.game.userInput.controls["start"] == true) {
      let newState = new PauseMenu();
      newState.enterState();
      this.game.userInput.resetKeys();
    }

    this.gameEntities.forEach((entity) => {
      entity.update(deltaTime);
    });

    for (var i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i] === undefined) continue;
      if (this.bullets[i].alive === false) {
        this.bullets.splice(i, 1);
        continue;
      }

      this.bullets[i].position.add(
        this.bullets[i].direction.multiplyScalar(this.bulletSpeedFactor)
      );
    }

    this.game.camera.update();
    this.world.update(deltaTime);
    this.controls.update(deltaTime);
    this.thirdPersonCamera.update(deltaTime);

    this.scoreBoard.update();
  }

  addToScene = (entity) => {
    this.gameEntities.push(entity);
    this.game.scene.add(entity.mesh);
  };

  disposeEntities = () => {
    const toBeDisposed = this.gameEntities.filter(
      (entity) => entity.shouldDispose
    );

    toBeDisposed.forEach((entity) => {
      this.game.scene.remove(entity.mesh);
      entity.dispose();
    });

    this.gameEntities = [
      ...this.gameEntities.filter((entity) => !entity.shouldDispose),
    ];
  };

  render(context) {
    // Draw blue triangle
    // context.save();
    // context.beginPath();
    // context.fillStyle = "blue";
    // context.moveTo(20, 20);
    // context.lineTo(180, 20);
    // context.lineTo(130, 130);
    // context.closePath();
    // context.fill();
    // context.textAlign = "start";

    // context.font = "48px serif";
    // context.fillStyle = "green";
    // context.fillText("FUN GAMEPLAY", 50, 100);

    // context.font = "24px serif";
    // context.fillStyle = "blue";
    // context.fillText("press 'start' to pause", 100, 200);
    // context.restore();

    this.scoreBoard.draw(context);
  }

  exitState() {
    super.exitState();
    this.cleanUp();
  }
  cleanUp() {
    super.cleanUp();
    // delete all threejs objects made from world map
    this.gameEntities.forEach((entity) => {
      this.game.scene.remove(entity.mesh);
      entity.dispose();
    });
    // remove single player ship

    this.game.scene.remove(this.playerShip.instance);
    this.playerShip.geometry.dispose();
    this.playerShip.material.dispose();

    //remove all ships,
    this.world.ships.cleanUp();
    //remove stars

    this.world.stars.cleanUp();

    //remove light
    let amLight = this.world.environment.ambientLight;
    this.game.scene.remove(amLight);
    let diLight = this.world.environment.directionalLight;
    this.game.scene.remove(diLight);

    // remove sphere

    this.game.scene.remove(this.world.sphereBoundary.instance);
    this.world.sphereBoundary.instance.geometry.dispose();
    this.world.sphereBoundary.instance.material.dispose();
  }
}
export default GameScene;

class ScoreBoard {
  constructor(totalScore) {
    this.game = new Game();
    this.total = totalScore;
    this.points = 0;
    this.isActive = true;
  }

  update() {
    // check how many blocks are in play
    // update points
    if (this.isActive) this.checkScore();
  }
  checkScore() {
    if (this.points == this.total) {
      this.isActive = false;

      this.finishGame();
    }
  }
  addPoint() {
    this.points++;
  }
  draw(context) {
    let display = this.points + "/" + this.total;
    let x = this.game.canvas2d.width - 60;
    context.fillStyle = "white";
    context.font = "48px serif";
    context.textAlign = "end";
    context.textBaseline = "top";
    context.fillText(display, x, 50);

    // draw points to 2d array
    // 0 / 10;
    // maybe add some ui padding for game.
  }

  finishGame() {
    setTimeout(() => {
      new DialogState({
        script: [
          " Wow thanks for doing that!",
          "This isn't the first time this has happened either...",
          "Some company moved in this system recently and they've been dumping their trash here ever since!",
          "It's becoming a problem...",
          "The double edged sword with space being a new area to explore is there are no regulations and you can get away with pretty much anything out here.",
          "Bigger corporations love it. ",
          "Anyway, just park your ship and come in for some tea. ",
        ],
        dialogFinishedAction: () => {
          this.game.transitionController.transition({
            fadeIntTime: 3,
            midAction: () => {
              while (this.game.stateStack.length > 1) {
                this.game.stateStack[
                  this.game.stateStack.length - 1
                ].exitState();
              }
            },
          });
        },
      }).enterState();
    }, 2000);
  }
}
