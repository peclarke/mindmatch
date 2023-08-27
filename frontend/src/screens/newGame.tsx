import useWebSocket from "react-use-websocket";
import { WS_URL } from "../globals";
import { Button } from "@mui/material";

import './newGame.css';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../main";
import Nav from "../components/nav";

const game = [
    {
        "q": "How many fingers do I have?",
        "a": "10"
    },
    {
        "q": "What did Charlotte make me on the first night of Hackathon?",
        "a": "A Hot Chocolate"
    },
    {
        "q": 'Why does music written in a minor key sound "sad" in comparison to major?',
        "a": "I dunno"
    }
]

const FilterConfirms = (message: MessageEvent<any>): boolean => {
    const evt = JSON.parse(message.data);
    return evt.type === "startgame"
}

export type NewGameScreenProps = {
    startLoading: () => void;
    startJoining: () => void;
}

export const NewGameScreen = (props: NewGameScreenProps) => {

    const [qa, setQa] = useState<any>({});

    const importAnki = () => {

        // anki parser... nice to have a teammate for this...

        setQa({});
    }

    const nav = useNavigate();

    useEffect(() => setQa(qa), []);
 
    return (
        <div className="newgame">
            <span id="newgametitle">New Game</span>
            <div>
                <Button variant="contained" onClick={() => nav("/game")}>Import Anki</Button>
            </div>
            <div>
                <Button variant="contained" onClick={() => props.startLoading()}>Create Game</Button>
            </div>
            <div>
                <Button variant="contained" onClick={() => props.startJoining()}>Join Game</Button>
            </div>
        </div>
    )
}

export type LoadingScreenProps = {
    qa: {};
    startGame: () => void;
    joining: boolean;
}

export const LoadingScreen = (props: LoadingScreenProps) => {
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
    })

    const createGame = () => {
        // if we're joining the game, don't create one
        if (props.joining) {
            localStorage.setItem("player", "two");

            sendJsonMessage({
                type: "joingame",
                content: ""
            })
        } else {
            localStorage.setItem("player", "one");

            sendJsonMessage({
                type: "newgame",
                content: props.qa
            })
        }
    }

    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: FilterConfirms
    })

    const qa = lastJsonMessage?.content || null;

    useEffect(() => console.log(lastJsonMessage), []);

    useEffect(() => createGame(), [])

    return (
        <>
            <GameStartListener />
            <Nav startJoining={function (): void {
                throw new Error("Function not implemented.");
            } } />
            <div className="loading">
                <h2>Waiting for Player</h2>
                <span>Copy the link below and send it to a friend to get started.</span>
                <input value={window.location.href} />
            </div>
        </>
    )
}

const GameStartConfirm = (message: MessageEvent<any>): boolean => {
    const evt = JSON.parse(message.data);
    return evt.type === "confirmstart";
}

export type GameStartListenerProps = {
    // p1Change: (name: string) => void;
    // p2Change: (name: string) => void;
}

export const GameStartListener = (props: GameStartListenerProps) => {
    const { setNames } = useContext(NameContext);

    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: GameStartConfirm
    })

    useEffect(() => {
        if (lastJsonMessage) {
            const { p1, p2 } = lastJsonMessage.content;
            setNames([p1, p2]);

            // localStorage.setItem("p1-name", p1);
            // localStorage.setItem("p2-name", p2);
        }
    }, [lastJsonMessage]);

    return (<></>)
}

export const JoinGameScreen = () => {
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
          console.log('WebSocket connection established.');
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
      });  
}