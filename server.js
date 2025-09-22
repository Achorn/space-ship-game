import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app.js";
const server = createServer(app); // Use http.createServer for WebSocket integration
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your Vite dev server's origin
  },
});
const port = process.env.PORT || 3000;

let players = {};
let serverBalls = {};

io.on("connection", connected);

const serverLoop = () => {
  //   userInteraction();
  // physicsLoop();
  // for (let id in serverBalls) {
  //   playerPos[id].x = serverBalls[id].pos.x;
  //   playerPos[id].y = serverBalls[id].pos.y;
  // }
  io.emit("positionsUpdate", players);
};
setInterval(serverLoop, 1000 / 60);

//listening to events after the connection is estalished
function connected(socket) {
  socket.on("newPlayer", (data) => {
    console.log("🥳 New client connected, id: " + socket.id);
    players[socket.id] = data;
    console.log("#️⃣ Current number of players: " + Object.keys(players).length);
    console.log("players dictionary: ", players);
    io.emit("updatePlayers", players);
  });
  socket.on("disconnect", function () {
    delete players[socket.id];
    console.log("Goodbye client with id " + socket.id);
    console.log("Current number of players: " + Object.keys(players).length);
    io.emit("updatePlayers", players);
  });
  socket.on("userCommands", (data) => {
    console.log(data);
    console("handle user commands soon");
  });

  socket.on("ClientClientHello", (data) => {
    socket.broadcast.emit("ServerClientHello", data);
  });

  socket.on("clientUpdateSelf", (data) => {
    // console.log(data);
    players[socket.id] = data;
    socket.broadcast.emit("posUpdates", players);
  });
}
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

// game class
// start
// end

// we dont need physics right now.. we just need to move the way we control ships
class AuthServerWorld {
  constructor() {}
  init() {
    //create playground 1
    // add physics
    // add add 60 fps loop
    // add  players
  }
}
