import { createServer } from "http";
import { Server } from "socket.io";
import * as THREE from "three";

import app from "./app.js";
import ShipController from "./src/server/controller/ShipController.js";

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

    let x = 0;
    let y = 2;
    let z = 20;

    backEndPlayers[socket.id] = {
      position: { x, y, z },
      matrix: new THREE.Matrix4().makeBasis(x, y, z),
    };
    backEndShipControllers[socket.id] = new ShipController();
    backendShipInputs[socket.id] = input;

    console.log(
      "#️⃣ Current number of players: " + Object.keys(backEndPlayers).length
    );
  });

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
