import { CircularProgress, Grid, Paper, Tooltip, Typography } from "@mui/material"

import './player.css';
import useWebSocket from "react-use-websocket";
import { WS_URL } from "../../globals";
import { SetStateAction, useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { EndTurnConfirm, NewQuestionListener } from "../results";
import anime from 'animejs/lib/anime.es.js';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

export type PlayerCardProps = {
    number: 1 | 2;
    name: string;
    lives: number;
    sword: boolean;
    shield: boolean;
    correct: boolean;
    left: boolean;
    // answerSent: boolean;
}

const ConfirmPlayerTurn = (message: MessageEvent<any>): boolean => {
    const evt = JSON.parse(message.data);
    return evt.type === "confirmturn";
}

type AnswerListenProps = {
    change: (stuff: any) => void
}

const PlayerCardWithPowers = (props: PlayerCardProps) => {
    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: ConfirmPlayerTurn
    })

    const [messageSent, setMessageSent] = useState<boolean>(false);

    useEffect(() => {
        console.log(lastJsonMessage);
        if (lastJsonMessage) {
            const player = localStorage.getItem('player') === "one" ? 1 : 2;
            if (lastJsonMessage?.content === props.number) {
                setMessageSent(true);
            };
        }
    }, [lastJsonMessage])

    return (
        <>
        {/* <AnswerListen /> */}
        <EndTurn setMessageSent={setMessageSent}/>
        {props.correct && <div className="rightAnswer">
            <CheckBoxIcon fontSize={"large"}/>
        </div>}
        <Paper elevation={3} className={props.left ? "playerCard left" : "playerCard right"} sx={{backgroundColor: "rgb(255,255,255,0.8)"}}>
            <div className="info">
                <img src={"./repogotchi"+props.number+".png"} className="avatar"/>
                <span>
                    <Typography variant="h6">
                        <strong>{props.name}</strong>
                    </Typography>
                </span>
                <div className="third">
                    {!messageSent 
                        ? <Tooltip title="User is still Answering"><CircularProgress size={30} className="circularProgress"/></Tooltip>
                        : <Tooltip title="User has Answered"><CheckCircleIcon fontSize={"large"} /></Tooltip>
                    } 
                </div>
            </div>
            <div className={props.left ? "newPlayerCard newLeft" : "newPlayerCard newRight"}>
                <div className="row1">
                    {
                        [...Array(props.lives < 0 ? 0 : props.lives).keys()].map(_ => {return (
                            <img src="./heart.png" />
                        )})
                    }
                    {
                        [...Array(3-props.lives).keys()].map(_ => {return (
                            <img src="./heart-used.png" />
                        )})
                    }
                </div>
                <div className="row2">
                    <img src={props.sword ? "./sword.png"   : "./sword-used.png"} />
                    <img src={props.shield ? "./shield.png" : "./shield-used.png"} />
                </div>
            </div>
        </Paper>
        </>
    )
}

type EndTurnProps = {
    setMessageSent: (val: boolean) => void;
}

const EndTurn = (props: EndTurnProps) => {
    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: EndTurnConfirm
    })

    const resetQuestion = () => props.setMessageSent(false);

    useEffect(() => {
        if (lastJsonMessage) {
            // trigger animation here

            // then go to reset stuff
            // props.setMessageSent(false);

            setTimeout(resetQuestion, 3000);
        }
    }, [lastJsonMessage])

    return (
        <></>
    )
}

// const PlayerCard = (props: PlayerCardProps) => {
//     return (
//         <div>
//             <Paper elevation={1} className={props.number === 1 ? "playerCard left" : "playerCard right"}>
//                 {/* <div> */}
//                 <img src={"./repogotchi"+props.number+".png"} className="avatar"/>
//                 <div className="health">
//                     <img src="./heart.png" className="heart"/>
//                     <img src="./heart.png" className="heart"/>
//                     <img src="./heart.png" className="heart"/>
//                 </div>
                
//                 {/* </div> */}
//                 {/* <div>
//                     <img src="./sword.png" />
//                 </div> */}
//             </Paper>
//         </div>
//     )
// }


export default PlayerCardWithPowers;