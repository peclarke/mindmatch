const { WebSocket, WebSocketServer } = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;
const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');

const customConfig = {
    dictionaries: [colors, animals],
    separator: " ",
    length: 2,
    style: "capital"
};

const randomNameGen = () => { return uniqueNamesGenerator(customConfig); }

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
    JOIN_GAME: 'joingame',
    PLAYER_ONE_TURN: "playeroneturn",
    PLAYER_TWO_TURN: "playertwoturn",
    END_TURN: "endturn",
    NEW_QUESTION: "newquestion",
    CONFIRM_TURN: "confirmturn"
}

function confirmTurn(player) {
    broadcastMessage({
        type: "confirmturn",
        content: player
    })
}

function checkAnswerNumber() {
    if (Object.keys(game["turn"]["answers"]).length === 2) {
        console.log("All answers have been given")
        // get all relevant information from state
        const turnNumber = game["turn"]["number"];
        const sysAnswer  = game["qsas"][turnNumber-1]["a"];
        const answerOne  = game["turn"]["answers"]["1"];
        const answerTwo  = game["turn"]["answers"]["2"];

        const result = checkAnswer(sysAnswer, answerOne, answerTwo);
        broadcastMessage({
            type: "endturn",
            content: result
        })

        nextTurn(turnNumber);
    }
}

function nextTurn(currentTurn) {
    const numQuestions = game["qsas"].length;

    console.log(numQuestions, currentTurn);

    if (currentTurn >= numQuestions) {
        // TODO: end the game, this is a win condition

        
        gameEnd();
        return;
    } 
    
    game = {
        ...game,
        "turn": {
            number: game["turn"]["number"] + 1,
            answers: {}
        }
    }

    const question = game["qsas"][currentTurn]["q"];
    const answer   = game["qsas"][currentTurn]["a"];

    // send notice to game that we begin
    console.log(question, answer, "SENDING NOW....")

    broadcastMessage({
        type: "newquestion",
        content: {
            "question": question,
            "answer":   answer
        }
    })


}

function checkAnswer(sysAnswer, answerOne, answerTwo) {
    const oneCorrect = sysAnswer === answerOne;
    const twoCorrect = sysAnswer === answerTwo;
    return {
        1: oneCorrect,
        2: twoCorrect
    }
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

    if (dataFromClient.type === typesDef.PLAYER_ONE_TURN) {
        game = {
            ...game,
            "turn": {
                ...game["turn"],
                answers: {
                    ...game["turn"]["answers"],
                    1: dataFromClient.content
                }
            }
        }

        console.log("PLAYER ONE HAS GIVEN AN ANSWER:")
        confirmTurn(1);
        checkAnswerNumber();
        return;
    }

    if (dataFromClient.type === typesDef.PLAYER_TWO_TURN) {
        console.log('player two turn....')
        game = {
            ...game,
            "turn": {
                ...game["turn"],
                answers: {
                    ...game["turn"]["answers"],
                    2: dataFromClient.content
                }
            }
        }
        console.log("PLAYER TWO HAS GIVEN AN ANSWER:")
        confirmTurn(2);
        checkAnswerNumber();
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
            answer:   answer,
            "p1":  game["p1"],
            "p2":  game["p2"]
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

    const p1name = randomNameGen();
    const p2name = randomNameGen();

    game = {
        "gid": gameId,
        "qsas": qsas,
        "players": [],
        "turn": {
            number: 0,
            answers: {}
        },
        "p1": p1name,
        "p2": p2name
    }
    console.log("init game started")
    console.log("game short aend stout", game);

    joinGame(originalPlayer);

    console.log("i am now confirming")

    // send a message to the client that the game has started
    sendMessage({
        type: "confirmstart",
        content: {
            "gid": gameId,
            "p1":  p1name,
            "p2":  p2name
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