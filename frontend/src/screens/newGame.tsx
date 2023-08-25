import useWebSocket from "react-use-websocket";
import { WS_URL } from "../globals";
import { Button } from "@mui/material";

import './newGame.css';
import { useEffect, useState } from "react";

const game = [
    {
        "q": "How many fingers do I have?",
        "a": "10"
    },
    {
        "q": "What did Charlotte make me on the first night of Hackathon?",
        "a": "A Hot Chocolate"
    }
]

const FilterConfirms = (message: MessageEvent<any>): boolean => {
    const evt = JSON.parse(message.data);
    return evt.type === "confirmstart"
}

export const NewGameScreen = () => {
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
          console.log('WebSocket connection established.');
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
      });

    const [qa, setQa] = useState<any>(game);

    const createGame = () => {
        sendJsonMessage({
            type: "newgame",
            content: qa
        })
    }

    const importAnki = () => {

        // anki parser... nice to have a teammate for this...

        setQa({});
    }
 
    return (
        <div className="newgame">
            <span id="newgametitle">New Game</span>
            <div>
                <Button variant="contained">Import Anki</Button>
            </div>
            <div>
                <Button variant="contained" onClick={createGame}>Create Game</Button>
            </div>
            <LoadingScreen />
        </div>
    )
}

export const LoadingScreen = () => {
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
          console.log('WebSocket connection established.');
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
      });

    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: FilterConfirms
    })

    useEffect(() => console.log(lastJsonMessage), [lastJsonMessage])

    const gameId = lastJsonMessage?.content.gid || "";

    return (
        <section>
            <h1>LOADING</h1>
            {gameId}
        </section>
    )
}

// export default NewGameScreen;