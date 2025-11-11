import { Server } from "socket.io";
import ShipController from "../src/server/controller/ShipController.js";
import PhysicsEngine from "../src/server/world/PhysicsEngineServer.js";
import { hsvToRgb } from "../src/utils/MathUtils.js";
import * as THREE from "three";

// make a game server class to clean up server?
const backEndPlayers = {};
const backEndProjectiles = {};
const backEndShipControllers = {};
const backendShipInputs = {};

const phsyicsEngine = new PhysicsEngine();
//add ships as physics objects that are moved by players (some time of object unaffected by physics world)
// add balls as moving physics objects
//add structures as objects

const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    pingInterval: 2000,
    pingTimeout: 5000,
    cors: {
      origin: "*", // Adjust as needed for security
    },
  });

  io.on("connection", (socket) => {
    socket.on("newPlayer", (input) => {
      console.log("🥳 New client connected, id: " + socket.id);
      const rgbColor = hsvToRgb(Math.random() * 360, 1, 1);
      const threeColor = new THREE.Color(rgbColor.r, rgbColor.g, rgbColor.b);

      let x = 0;
      let y = 2;
      let z = 20;

      backEndPlayers[socket.id] = {
        position: { x, y, z },
        matrix: new THREE.Matrix4().makeBasis(x, y, z),
        color: threeColor,
      };
      backEndShipControllers[socket.id] = new ShipController();
      backendShipInputs[socket.id] = input;

      console.log(
        "#️⃣ Current number of players: " + Object.keys(backEndPlayers).length
      );
    });

    // I bless these walls 🪄

    socket.on("disconnect", () => {
      delete backEndPlayers[socket.id];
      delete backEndShipControllers[socket.id];
      console.log("Goodbye client with id " + socket.id);
      console.log(
        "Current number of players: " + Object.keys(backEndPlayers).length
      );
      // io.emit("updatePlayers", players);
      socket.broadcast.emit("playerLeave", socket.id);
    });

    socket.on("clientUpdateSelf", (frontEndInput) => {
      backendShipInputs[socket.id] = frontEndInput;
      //   //update players using keydown event in the near future
    });
  });

  // i bless these walls ✨
  let lastExecutionTime = Date.now(); // Initialize with the current time

  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastExecutionTime; // Calculate delta time in milliseconds

    for (const id in backEndPlayers) {
      let backEndPlayer = backEndPlayers[id];
      backEndShipControllers[id].update(
        backEndPlayer,
        backendShipInputs[id],
        deltaTime
      );
    }

    io.emit("updatePlayers", backEndPlayers);
    lastExecutionTime = currentTime; // Update for the next iteration
  }, 15);
};

export default initSocketServer;
