import { useEffect, useState } from "react";
import { LoadingScreen, NewGameScreen } from "./newGame";
import GameScreen from "./game";
import useWebSocket from "react-use-websocket";
import { WS_URL } from "../globals";
import { uq_data_set } from "../assets/data";

export type GameLogicProps = {
    startGame: () => void;
}

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


export type SomeGameLogicProps = {
    joining: boolean;
}

export const ConfirmFullStart = (e: MessageEvent<any>): boolean => {
    const evt = JSON.parse(e.data);
    return evt.type === "startgame";
}

export const EndGame = (e: MessageEvent<any>): boolean => {
    const evt = JSON.parse(e.data);
    return evt.type === "endgame";
}

const Full2GameLogic = (props: SomeGameLogicProps) => {

    const [qa, setQa] = useState(uq_data_set);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);

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
        filter: ConfirmFullStart
    })

    // const qas = lastJsonMessage?.content || {};

    const [singleQ, setSingleQ] = useState<{q: string; a: string; loaded: boolean}>({q: "", a: "", loaded: false});
    useEffect(() => {
        // start the game, load the first question
        setSingleQ({
        q: lastJsonMessage?.content["question"],
        a: lastJsonMessage?.content["answer"],
        loaded: true
        });
        // change screens
        if (singleQ.loaded) setGameStarted(true);

    }, [lastJsonMessage]);

    return (
        <>
        {
            !gameStarted 
            ? <LoadingScreen 
                    startGame={() => setGameStarted(true)} 
                    qa={qa}
                    joining={props.joining}
               />
            : <GameScreen 
                q={singleQ["q"]} 
                a={singleQ["a"]} 
                sendMessage={sendJsonMessage}
                setSingle={setSingleQ}
                inputDisabled={inputDisabled}
                setInputDisabled={setInputDisabled}
               />
        }
        </>
    )
}

export default Full2GameLogic;