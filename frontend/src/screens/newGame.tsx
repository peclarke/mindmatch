import useWebSocket from "react-use-websocket";
import { WS_URL } from "../globals";
import { Button } from "@mui/material";

const NewGameScreen = () => {
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
          console.log('WebSocket connection established.');
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
      });

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

    const createGame = () => {
        sendJsonMessage({
            type: "newgame",
            content: game
        })
    }

    return (
        <div>
            New Game Screen
            <Button variant="contained" onClick={createGame}>Send</Button>
        </div>
    )
}

export default NewGameScreen;