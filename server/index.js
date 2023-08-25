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
//     "started": true,
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

const numberOfPlayers = 2;
let game = null;

// Event types
const typesDef = { 
    TEST: "test",
    TURN: 'turn',
    NEW_GAME: 'newgame',
    END_GAME: 'endgame',
    CONFIRM_START: 'confirmstart',
    START_GAME: 'startgame'
}

const endGame = {
    type: "endgame",
    content: "endgame"
}


function handleMessage(message, userId) {
    const dataFromClient = JSON.parse(message.toString());

    if (dataFromClient.type === typesDef.NEW_GAME) {
        newGame(dataFromClient['content'], userId);
        return;
    }

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

function broadcastMessage(json) {

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

    if (game !== null) {
        if (game["players"].includes(userId)) {
            // end the game here
            gameEnd()
        }
    }

    delete clients[userId];
}

function gameEnd() { broadcastMessage(endGame); game = {}; }

function gameCheck(userId) {
    console.log("checking game...")
    if (game !== null && Object.keys(game).length > 0) { 
        console.log(game);
        if (game["players"].length < numberOfPlayers) {
            game["players"].push(userId);
        }

        if (game["players"].length === 2) {
            gameInit();
        }
    }
}

function gameInit() {
    console.log("BEGIN THE GAME")
    console.log(game);

    // increase the question number and get what we need
    const newTurn = game["turn"]["number"] + 1;

    game = {
        ...game,
        "turn": {
            number: newTurn
        }
    }

    const question = game["qsas"][newTurn-1]["q"];
    const answer   = game["qsas"][newTurn-1]["a"];

    // send notice to game that we begin
    broadcastMessage({
        type: "startgame",
        content: {
            question: question,
            answer:   answer
        }
    })

}


/**
 * When a new game is created but no one is invited yet
 * @param {} data 
 */
function newGame(data, originalPlayer) {

    const gameId = uuidv4();
    const qsas   = data;

    game = {
        "gid": gameId,
        "qsas": qsas,
        "players": [originalPlayer],
        "turn": {
            number: 0,
            answers: {}
        }
    }
    console.log("init game started")
    // console.log(game);

    // send a message to the client that the game has started
    sendMessage({
        type: "confirmstart",
        content: {
            "gid": gameId
        }
    }, originalPlayer)

}

function sendMessage(data, userId) {
    const msg = JSON.stringify(data);
    const client = clients[userId];

    if( client.readyState === WebSocket.OPEN) {
        client.send(msg);
    }

    // console.log(msg, client)
    // client.send(msg);
}

// A new client connection request received
wsServer.on('connection', function(connection) {
    // Generate a unique code for every user
    const userId = uuidv4();
    console.log('Recieved a new connection');
  
    // Store the new connection and handle messages
    clients[userId] = connection;
    // gameQueue.push(userId);

    // TODO DEAL WITH MORE THAN 2 FUCKING PEOPLE

    console.log(`${userId} connected.`);
    connection.on('message', (message) => handleMessage(message, userId));

    // User disconnected
    connection.on('close', () => handleDisconnect(userId));

    // check if we're ready to start a game
    gameCheck(userId);
  });