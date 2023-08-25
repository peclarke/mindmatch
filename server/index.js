const { WebSocket, WebSocketServer } = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// I'm maintaining all active connections in this object
const clients = {};

// Maintain the game state here. ONLY ONE GAME AT A TIME FUCKERS.!!!!!!@!@!!!!!!

// game = {
//     "gid": 123,
//     user_connections: [0,1],
//     qsas: [{
//         q: "Why does music written in a minor key sound 'sad' in comparison to major?",
//         a: "WHO KNOWS."
//     }],
//     turn: {
//         number: 0, // initially
//         players: {
//             "uid": "WHO KNOWS", // potentially still waiting for our second 
//         }
//     }
// }

let game = {};

// Event types
const typesDef = { 
    TEST: "test",
    TURN: 'turn'
}



function handleMessage(message, userId) {
    const dataFromClient = JSON.parse(message.toString());

    if (dataFromClient.type === typesDef.TURN) {
        // check if we have enough turns to start calculations


        // begin calculations



        // modify game state


        
        // send off results to our friends


        // FUCKING PARTY
    } else {
        console.log(dataFromClient);
        broadcastMessage("asd");
    }
}

function broadcastMessage(_json) {
    // We are sending the current data to all connected clients
    const json = {
        "type": "test",
        "data": "datatatatata"
    }

    const data = JSON.stringify(json);

    for (let userId in clients) {
      let client = clients[userId];
      if(client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    };
}

function handleDisconnect(userId) {
    console.log(`${userId} disconnected.`);
    // const json = { type: typesDef.USER_EVENT };
    // const username = users[userId]?.username || userId;
    // userActivity.push(`${username} left the document`);
    // json.data = { users, userActivity };

    delete clients[userId];
    // delete users[userId];
    // broadcastMessage(json);
}

// A new client connection request received
wsServer.on('connection', function(connection) {
    // Generate a unique code for every user
    const userId = uuidv4();
    console.log('Recieved a new connection');
  
    // Store the new connection and handle messages
    clients[userId] = connection;

    // TODO DEAL WITH MORE THAN 2 FUCKING PEOPLE

    console.log(`${userId} connected.`);
    connection.on('message', (message) => handleMessage(message, userId));

    // User disconnected
    connection.on('close', () => handleDisconnect(userId));
  });