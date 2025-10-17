import { createServer } from "http";
import { Server } from "socket.io";
import * as THREE from "three";
import { hsvToRgb } from "./src/utils/MathUtils.js";
import app from "./app.js";
import ShipController from "./src/server/controller/ShipController.js";

/**
 * I bless these walls with magic. these invisible walls. i breath life into them. a home away from home
 * a home for muself and others who need shelter. i am building alone, but i will build with others eventually.
 * coding can be a hard process. am i doing this right? and im traversing the correct path? while I might not be going down the perfect path,
 * im at least going down my path. this has been such a difficult journey, but a fulfilling one. this last hurdle was a big one. and the thing that stopped me, (scope)
 * was actually a nexted object.. good to know. i was so confused.next i will add the bullets and the physics engine!!!! so much interacting!!!! so cool.
 */

const server = createServer(app); // Use http.createServer for WebSocket integration
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your Vite dev server's origin
  },
});
const port = process.env.PORT || 3000;

const backEndPlayers = {};
const backEndProjectiles = {};
const backEndShipControllers = {};
const backendShipInputs = {};

//SERVER
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

  socket.on("clientUpdateSelf", (input) => {
    backendShipInputs[socket.id] = input;
    //   //update players using keydown event in the near future
  });
});

// i bless these walls ✨
setInterval(() => {
  for (const id in backEndPlayers) {
    let backEndPlayer = backEndPlayers[id];
    backEndShipControllers[id].update(backEndPlayer, backendShipInputs[id]);
  }
  io.emit("updatePlayers", backEndPlayers);
}, 15);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
