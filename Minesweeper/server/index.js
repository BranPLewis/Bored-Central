const express = require("express");
const cors = require("cors");

// 1: Require web sockets
const WebSocket = require("ws");

const clients = {};

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static("Minesweeper/public"));
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      callback(null, origin);
    },
  })
);

// 2: Assign name to server
const server = app.listen(port, function () {
  console.log(`Running server on port ${port}...`);
});

// 3: Name websocket
const wss = new WebSocket.Server({ server: server });

wss.on("request", (request) => {
  //connect
  const connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("opened!"));
  connection.on("close", () => console.log("Closed!"));
  connection.on("message", (message) => {
    // I have receieved a message from a client
    const result = JSON.parse(message.utf8Data);
    console.log(result);
  });

  //generate a new clientID
  const clientID = clientIDcreation();
  clients[clientID] = {
    connection: connection,
  };

  const payLoad = {
    method: "connect",
    clientID: clientID,
  };
  // send back the client connect
  connection.send(JSON.stringify(payLoad));
});

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring;
}
// to call the clientID creation tool
const clientIDcreation = () => S4() + S4() + "_" + S4() + "-4" + S4().substr;

// wss.on("connection", function (ws) {
//   // This is the new client connection
//   console.log("New `ws` client connected");

//   var playerID = ws;

//   // Handle message through websocket
//   ws.on("message", function incoming(message) {
//     console.log("Got a message through WS: ", message.toString());
//     broadcast(message.toString());
//   });
//   ws.on("close", function () {
//     console.log("Client has Disconnected");
//   });
// });

app.post("/messages", function (req, res) {
  // Handle message through HTTP
  console.log("Got a message through HTTP: ", req.body.message);
  broadcast(req.body.message);
  res.sendStatus(200);
});

function broadcast(message) {
  wss.clients.forEach((client) => {
    client.send(message);
  });
}
