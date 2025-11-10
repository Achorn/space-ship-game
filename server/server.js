import { createServer } from "http";
import app from "./app.js";
import initSocketServer from "./socketHandler.js";

/**
 * I bless these walls with magic. these invisible walls. i breath life into them. a home away from home
 * a home for muself and others who need shelter. i am building alone, but i will build with others eventually.
 * coding can be a hard process. am i doing this right? and im traversing the correct path? while I might not be going down the perfect path,
 * im at least going down my path. this has been such a difficult journey, but a fulfilling one. this last hurdle was a big one. and the thing that stopped me, (scope)
 * was actually a nexted object.. good to know. i was so confused.next i will add the bullets and the physics engine!!!! so much interacting!!!! so cool.
 */

const server = createServer(app); // Use http.createServer for WebSocket integration
initSocketServer(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
