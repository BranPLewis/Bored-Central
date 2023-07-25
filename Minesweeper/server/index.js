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
    // Creation of a new game
    if (result.method === "create") {
      const clientID = result.clientID;
      const gameID = guid();
      games[gameID] = {
        id: gameID,
        balls: 20,
        clients: [],
      };

      const payLoad = {
        method: "create",
        game: games[gameID],
      };

      const con = clients[clientID].connection;
      con.send(JSON.stringify(payLoad));
    }

    // If player wants to join an existing game
    if (result.method === "join") {
      const clientID = result.clientID;
      const gameID = result.gameID;
      const game = games[gameID];
      if (game.clients.length >= 2) {
        // Max players reached
        return;
      }
      game.clients.push({ clientID: clientID });

      if (game.clients.length === 2) updateGameState();

      const payLoad = {
        method: "join",
        game: game,
      };

      // Loop through all clients and tell them that other clients have joined
      game.clients.forEach((c) => {
        clients[c.clientID].connection.send(JSON.stringify(payLoad));
      });
    }

    if (result.method === "play") {
      const gameID = result.gameID;
      const ballID = result.ballID;
      let state = games[gameID].state;
      if (!state) state = {};

      state[ballID] = color;
    }
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

function updateGameState() {
  //{"gameid", fasdfsf}
  for (const g of Object.keys(games)) {
    const game = games[g];
    const payLoad = {
      method: "update",
      game: game,
    };

    game.clients.forEach((c) => {
      clients[c.clientId].connection.send(JSON.stringify(payLoad));
    });
  }

  setTimeout(updateGameState, 500);
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring;
}
// to call the clientID creation tool
const guid = () => S4() + S4() + "_" + S4() + "-4" + S4().substr;

// wss.on("connection", function (ws) {
//   // This is the new client connection
//   console.log("New 'ws' client connected");

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

// app.post("/messages", function (req, res) {
//   // Handle message through HTTP
//   console.log("Got a message through HTTP: ", req.body.message);
//   broadcast(req.body.message);
//   res.sendStatus(200);
// });

// function broadcast(message) {
//   wss.clients.forEach((client) => {
//     client.send(message);
//   });
// }
