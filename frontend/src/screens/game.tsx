import { Grid } from "@mui/material";
// import UserInput from "../components/input";
// import QuestionCard, { QuestionCardProps } from "../components/question";

import './game.css';
import QuestionCard, { QuestionCardProps } from "../components/question/question";
import UserInput from "../components/input/input";
import PlayerCard from "../components/player/player";
import { useContext, useEffect, useState } from "react";
import Nav from "../components/nav";
import useWebSocket from "react-use-websocket";
import { WS_URL } from "../globals";
import { EndGame, FinishListener } from "./full2GameLogic";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { EndTurnListener, NewQuestionListener } from "../components/results";
import { GameStartListener, p1Name, p2Name } from "./newGame";
import { NameContext } from "../main";

export type GameScreenProps = {
    q: string;
    a: string;
    inputDisabled: boolean;
    sendMessage: SendJsonMessage;
    setSingle: React.Dispatch<React.SetStateAction<{
        q: string;
        a: string;
        loaded: boolean;
    }>>
    setInputDisabled: (val: boolean) => void;
    setFinalScreen: (stats: StatType) => void;
}

const GameScreen = (props: GameScreenProps) => {
    // const [inputDisabled, setInputDisabled] = useState<boolean>(false);

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
        // console.log('first end game')
        // console.log(lastJsonMessage)
        if (lastJsonMessage) {
            // console.log("end game")
            localStorage.clear();
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
        if (player === 3) {
            setLives({
                ...lives,
                1: lives[1] - 1,
                2: lives[2] - 1
            })
            return;
        }

        setLives({
            ...lives,
            [player]: lives[player] - 1
        })
    }

    const { names } = useContext(NameContext);
    
    return (
        <>
        <Nav />

        {/* Some listeners for the server */}
        <FinishListener setFinalScreen={props.setFinalScreen}/>
        {/* <GameStartListener /> */}
        <EndTurnListener
            takeHeart={takeHeart}
            useShield={useShield}
            useSword= {useSword}
        />
        <NewQuestionListener 
            setQuestion={props.setSingle}
            setDisabled={props.setInputDisabled}
        />
        <section>
            <Grid container>
                <Grid item xs={4} className="playerColumns">
                    {/* maybe some scores for player 1? animation comes form this side */}
                    <PlayerCard 
                        number={1} 
                        name={names[0]}
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
                            disabled={props.inputDisabled}
                        />
                        <UserInput 
                            disabled={props.inputDisabled}
                            setDisabled={props.setInputDisabled}
                            usedPowerUps={powerUps}
                            sendMessage={props.sendMessage}
                        />
                    </div>
                </Grid>
                <Grid item xs={4} className="playerColumns">
                    <PlayerCard 
                        number={2} 
                        name={names[1]} 
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