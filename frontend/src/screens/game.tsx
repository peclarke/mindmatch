import { Grid } from "@mui/material";
// import UserInput from "../components/input";
// import QuestionCard, { QuestionCardProps } from "../components/question";

import './game.css';
import QuestionCard, { QuestionCardProps } from "../components/question/question";
import UserInput from "../components/input/input";
import PlayerCard from "../components/player/player";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import useWebSocket from "react-use-websocket";
import { WS_URL } from "../globals";
import { EndGame } from "./full2GameLogic";

export type GameScreenProps = {
    q: string;
    a: string;
}

const GameScreen = (props: GameScreenProps) => {
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);

    const [lives, setLives] = useState({
        1: 3,
        2: 3
    })

    const [powerUps, setPowerUps] = useState({ // these are powerups that are used up
        1: [] as string[],
        2: [] as string[]
    })

    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: EndGame
    })

    useEffect(() => {
        console.log('first end game')
        console.log(lastJsonMessage)
        if (lastJsonMessage) {
            console.log("end game")
            window.location.reload();
        }
    }, [lastJsonMessage]);

    const useSword = (player: number) => {
        setPowerUps({
            ...powerUps,
            [player]: [...powerUps[player], "sword"]
        })
    }

    const useShield = (player: number) => {
        setPowerUps({
            ...powerUps,
            [player]: [...powerUps[player], "shield"]
        })
    }

    const takeHeart = (player: number) => {
        setLives({
            ...lives,
            [player]: lives[player] - 1
        })
    }

    // const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    //     onOpen: () => {
    //       console.log('WebSocket connection established.');
    //     },
    //     share: true,
    //     filter: () => false,
    //     retryOnError: true,
    //     shouldReconnect: () => true
    //   });

    return (
        <>
        <Nav />
        <section>
            <Grid container>
                <Grid item xs={4} className="playerColumns">
                    {/* maybe some scores for player 1? animation comes form this side */}
                    <PlayerCard 
                        number={1} 
                        name="Bob Jenkins" 
                        lives={lives[1]}
                        sword={!powerUps[1].includes("sword")}
                        shield={!powerUps[1].includes("shield")}
                    />
                </Grid>
                <Grid item xs={4}>
                    <div className="middleColumn">
                        <QuestionCard 
                            q={props.q}
                            a={props.a}
                            disabled={inputDisabled}
                        />
                        <UserInput 
                            disabled={inputDisabled}
                            setDisabled={setInputDisabled}
                            usedPowerUps={powerUps}
                        />
                    </div>
                </Grid>
                <Grid item xs={4} className="playerColumns">
                    <PlayerCard 
                        number={2} 
                        name="Alice Actions"  
                        lives={lives[2]}
                        sword={!powerUps[2].includes("sword")}
                        shield={!powerUps[2].includes("shield")}
                    />
                </Grid>
            </Grid>
        </section>
        </>
    )
}

export default GameScreen;