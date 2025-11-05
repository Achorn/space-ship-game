import World from "../World/World";
import GameState from "./GameState";
import PauseMenu from "./PauseMenu";
import BasicShipController from "../Utils/controllers/BasicShipController";
import ThirdPersonShipCamera from "../Utils/cameras/ThirdPersonShipCamera";
import PlayerShip from "../World/PlayerShip";
import TargetLoader from "./gameScene/targetLoader";
import DialogState from "./dialog/DialogState";
import Game from "../Game";
import EndCredits from "./EndCredits";
import { io } from "socket.io-client";

const apiEnv = process.env.NODE_ENV;
console.log(apiEnv);
const URL =
  apiEnv === "development"
    ? `http://localhost:3000`
    : `https://${window.location.hostname}`;

// console.log(URL);
import * as THREE from "three";
import BasicCharacterControllerInput from "../Utils/BasicCharacterControllerInput";

// i assume this is the actual play part of the game
//god guide me
// the mountains are beautiful, and the wind blows through the grass.
// may i create something beautiful for others that come after me.
// this is an art. not just numbers on a screen, but an idea. sweat and tears.
// a climb that takes more than a day. more than a week, a month or a year, but it is a daily journey.
// but also one that requires rest, relaxations and time away. I am back and i am energized. lets get multiplayer in this story
// I might be coding this alone, but i cant do this alone. i need the help from my friends. a life filled with love takes a village.
// you are no exception

// thank you to my friends who have supported my. especially McKinley.
class GameSceneMultiplayer extends GameState {
  constructor() {
    super();
    this.init();
    this.socket;
  }
  init() {
    this.clientShips = {};

    this.socket = io(URL);

    this.socket.on("connect", () => {
      console.log("connected!");
      this.socket.emit("newPlayer", this.input.keys);
    });
    this.socket.on("posUpdates", (players) => {
      console.log(players);
      for (let id in players) {
        if (this.clientShips[id] !== undefined && id !== this.socket.id) {
          this.updateClientShip(id, players);
        }
      }
    });
    this.socket.on("updatePlayers", (backEndPlayers) => {
      for (const id in backEndPlayers) {
        const backEndPlayer = backEndPlayers[id];
        // player doesnt exist yet
        if (!this.clientShips[id]) {
          console.log("player doesnt exist yet", id);
          this.addNewClientShip(id, backEndPlayer);
        } else {
          // update existing player
          this.updateClientShip(id, backEndPlayer);
        }
      }
      //player no longer exists in the backend
      for (const id in this.clientShips) {
        if (!backEndPlayers[id]) {
          this.removeNewClientShip(id);
        }
      }
    });

    //backend
    this.gameEntities = [];
    this.world = new World(this);
    this.bulletSpeedFactor = 1.4;

    //Frontend
    this.input = new BasicCharacterControllerInput(
      this.game.userInput.controls
    );
    this.playerShip;
    this.thirdPersonCamera = new ThirdPersonShipCamera(
      this.game.camera.instance,
      this.playerShip
    );
    this.bullets = [];
    new TargetLoader(this); //call once and then it dissapears???
  }

  update(deltaTime) {
    this.input.update();
    this.socket.emit("clientUpdateSelf", this.input.keys);
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
    this.thirdPersonCamera.update(deltaTime);
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

  render(context) {}
  enterState() {
    super.enterState();
  }
  exitState() {
    this.socket.disconnect();
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

    Object.values(this.clientShips).forEach((mesh) => {
      this.game.scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    });

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
  addNewClientShip(id, backendPlayer) {
    let geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    let material = new THREE.MeshStandardMaterial({
      color: backendPlayer.color,
    });
    let mesh = new THREE.Mesh(geometry, material);
    let newShip = mesh;
    this.game.scene.add(newShip);
    this.clientShips[id] = newShip;
    if (this.socket.id === id) this.thirdPersonCamera.target = newShip;
    console.log("adding new ship!");
  }
  // TODO fix removing client. just do it with socketio
  removeNewClientShip(id) {
    console.log("removing client ship!");
    let mesh = this.clientShips[id];
    this.game.scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
    delete this.clientShips[id];
    mesh = null;
  }
  updateClientShip(id, backendPlayer) {
    let curShip = this.clientShips[id];
    let { position, matrix } = backendPlayer;
    curShip.matrixAutoUpdate = false;
    curShip.matrix.copy(matrix);
    curShip.position.set(position.x, position.y, position.z);
    curShip.matrixWorldNeedsUpdate = true;
  }
}
export default GameSceneMultiplayer;

class ScoreBoard {
  constructor(totalScore) {
    this.game = new Game();
    this.total = totalScore;
    this.points = 0;
    this.isActive = true;
  }

  update() {
    this.game.ammoPhysics.update(this.game.time.delta);
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
            fadeoutTime: 2,
            fadeInTime: 5,
            midAction: () => {
              let endCredits = new EndCredits();
              this.game.stateStack.push(endCredits);
            },
          });
        },
      }).enterState();
    }, 2000);
  }
}
