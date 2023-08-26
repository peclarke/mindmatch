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

const numberOfPlayers = 2;
let game = null;

// Event types
const typesDef = { 
    TEST: "test",
    TURN: 'turn',
    NEW_GAME: 'newgame',
    END_GAME: 'endgame',
    CONFIRM_START: 'confirmstart',
    START_GAME: 'startgame',
    JOIN_GAME: 'joingame'
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

    if (dataFromClient.type === typesDef.JOIN_GAME) {
        joinGame(userId);
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
        console.log("sending data", data);
        client.send(data);
      }
    };
}

function handleDisconnect(userId) {
    console.log(`${userId} disconnected.`);
    gameEnd()

    // if (game !== null && Object.keys(game).length > 0) {
    //     if (game["players"].includes(userId)) {
    //         // end the game here
    //         gameEnd()
    //     }
    // }

    delete clients[userId];
}

function gameEnd() { 
    broadcastMessage({
        type: "endgame",
        content: ""
    });
    game = {}; 
}

function joinGame(userId) {
    game["players"].push(userId);

    if (game["players"].length === 2) gameInit();
}

// function gameCheck(userId) {
//     if (game !== null && Object.keys(game).length > 0) { 
//         console.log(game);
//         if (game["players"].length < numberOfPlayers) {
//             game["players"].push(userId);
//         }

//         if (game["players"].length === 2) {
//             gameInit();
//         }
//     }
// }

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

    console.log("ooga booga ooga booga");
    console.log(game)

    const question = game["qsas"][newTurn-1]["q"];
    const answer   = game["qsas"][newTurn-1]["a"];

    // send notice to game that we begin
    console.log(question, answer, "SENDING NOW....")

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
        "players": [],
        "turn": {
            number: 0,
            answers: {}
        }
    }
    console.log("init game started")
    console.log("game short aend stout", game);

    joinGame(originalPlayer);

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
    // gameCheck(userId);
  });