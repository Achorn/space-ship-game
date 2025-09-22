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
const URL = `https://${window.location.hostname}`;
console.log(URL);
import * as THREE from "three";

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
    this.selfID;

    this.socket = io(URL);

    this.socket.on("connect", () => {
      this.selfID = this.socket.id;

      console.log("connected!");
      this.socket.emit("newPlayer", this.controls.position);
    });
    this.socket.on("posUpdates", (players) => {
      let playersFound = {};
      for (let id in players) {
        //check for new SHIP
        if (this.clientShips[id] === undefined && id !== this.socket.id) {
          this.addNewClientShip(id);
        }
        playersFound[id] = true;
      }
      //delete non ships
      for (let id in this.clientShips) {
        if (!playersFound[id]) {
          console.log("removing ship!");
          // handle removal later!
          // this.removeNewClientShip(id);
        }
        // update ship position?
        for (let id in players) {
          if (this.clientShips[id] !== undefined && id !== this.selfID) {
            this.updateClientShip(id, players);
          }
        }
      }

      for (let id in players) {
      }
    });
    //connect to client
    // ... thats kind of it

    //backend
    this.gameEntities = [];
    this.world = new World(this);
    this.bulletSpeedFactor = 1.4;

    //Frontend
    this.playerShip = new PlayerShip();
    this.game.camera.ship = this.playerShip;
    this.controls = new BasicShipController(this.playerShip.instance, this);
    this.thirdPersonCamera = new ThirdPersonShipCamera(
      this.game.camera.instance,
      this.controls
    );
    //both
    this.bullets = [];
    new TargetLoader(this); //call once and then it dissapears???

    this.gameEntities.push(this.playerShip);
    this.scoreBoard = new ScoreBoard(
      this.gameEntities.filter(
        (entity) => entity.entityType === "target"
      ).length
    );
  }

  update(deltaTime) {
    this.socket.emit(
      "clientUpdateSelf",
      this.controls.position
      // y: this.playerShip.position.y,
      // z: this.playerShip.position.z,
    );
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
    this.scoreBoard.draw(context);
  }
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
    // remove single player ship

    this.game.scene.remove(this.playerShip.instance);
    this.playerShip.geometry.dispose();
    this.playerShip.material.dispose();

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
  addNewClientShip(id) {
    let geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    let material = new THREE.MeshStandardMaterial({ color: "red" });
    let mesh = new THREE.Mesh(geometry, material);

    console.log("adding new ship!");
    let newShip = mesh;
    this.clientShips[id] = newShip;
    this.game.scene.add(newShip);
    // this.gameEntities.push(newShip);
  }
  // TODO fix removing client. just do it with socketio
  removeNewClientShip(id) {
    console.log("removing client ship!");
    this.clientShips[id].remove();
    delete this.clientShips[id];
    this.game.scene.remove(this.clientShips[id].mesh);
    this.clientShips[id].dispose();
  }
  updateClientShip(id, players) {
    let curShip = this.clientShips[id];
    curShip.position.set(players[id].x, players[id].y, players[id].z);
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
