import { Button, Grid, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

import './input.css';
// import '../../public/sword.png';
// import 'shield.png';

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../globals';
import { NewQuestionConfirm } from '../results';

export type InputButtonProps = {
    type: "text" | "button" | "enter"
    defense?: boolean;
    disabled: boolean;
    submitAns: (val: string) => void;
}

const InputButton = (props: InputButtonProps) => {
    const [answer, setAnswer] = useState("");

    const handleKeyDown = (event: any) => {
        console.log(event);
        if (event.code === "Enter") {
            if (props.submitAns) {
                props.submitAns(answer);
            }
        }
    }

    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: NewQuestionConfirm
    })

    useEffect(() => {
        if (lastJsonMessage) {
            console.log(lastJsonMessage);
            setAnswer("");
        }
    }, [lastJsonMessage])

    return (
        <div>
            {
                props.type === "text" 
                ? <TextField onKeyDown={(e) => handleKeyDown(e)} disabled={props.disabled} fullWidth={true} className="answerInput" variant="filled" value={answer} onChange={(e) => setAnswer(e.target.value)}></TextField>
                    : props.type === "button"
                ? <Button className="actionBtn" variant="contained">{props.defense ? "shield" : "sword"}</Button>
                    : props.type === "enter"
                ? <Tooltip title="Submit answer">
                    <Button 
                        disabled={props.disabled} 
                        onClick={() => props.submitAns ? props.submitAns(answer) : null} 
                        className="enterBtn" 
                        variant="contained"
                    >
                        <KeyboardReturnIcon sx={{height: 128}}/>
                    </Button>
                  </Tooltip>
                : "bro no way"
            }
        </div>
    )
}

export type UserInputProps = {
    disabled: boolean;
    setDisabled: (val: boolean) => void;
    usedPowerUps: {};
    sendMessage: SendJsonMessage;
    
}

const UserInput = (props: UserInputProps) => {
    const [powerUp, setPowerUp] = useState<"sword" | "shield" | "">("");

    const [swordBtn,  setSwordBtn]  = useState(false);
    const [shieldBtn, setShieldBtn] = useState(false);

    const changePowerUp = (value: "sword" | "shield" | "") => {
        if (powerUp === "") {setPowerUp(value); return }

        if (powerUp === value) {
            // toggle off
            setPowerUp("");
        } else {
            setPowerUp(value);
        }
    }

    const submitAnswer = (answer: string) => {
        // disable input
        props.setDisabled(true);

        // update information on player card
        
        // update server
        
        // hang on, who the fuck are we?
        // const player = localStorage.getItem('player') === "one" ? 1 : 2;
        // if (player === 1) {
        props.sendMessage({
            type: localStorage.getItem('player') === "one" ? "playeroneturn" : "playertwoturn",
            content: answer
        })

        setSwordBtn(false);
        setShieldBtn(false);

        console.log(answer);
    }



    return (
        <Grid container className="userInput" columnSpacing={0}>
            <Grid container item xs={10}>
                <Grid item xs={12} className={props.disabled ? "parentAnswerInput disabled" : "parentAnswerInput enabled"}>
                    <InputButton type="text" disabled={props.disabled} submitAns={submitAnswer}/>
                </Grid>
                <Grid item xs={12}>
                    <div className={!props.disabled ? "action-buttons input-enabled" : "action-buttons input-disabled"}>
                        <Tooltip title="Double your attack">
                            <Button disabled={swordBtn || props.disabled} className="actionBtn" variant="contained" onClick={() => setSwordBtn(true)} onChange={() => {changePowerUp("sword"); setSwordBtn(true)}}>
                                <img src="./sword.png" alt="double attack button" className={props.disabled ? "img-disabled" : "" }/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Defend against opponent">
                            <Button disabled={shieldBtn || props.disabled} onClick={() => setShieldBtn(true)} className="actionBtn" variant="contained" onChange={() => changePowerUp("shield")}>
                                <img src="./shield.png" alt="defend button" className={props.disabled ? "img-disabled" : "" }/>
                            </Button>
                        </Tooltip>
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={2} className={!props.disabled ? "enterGridCell input-enabled" : "enterGridCell input-disabled"}>
                <InputButton disabled={props.disabled} type="enter" submitAns={submitAnswer}/>
            </Grid>
        </Grid> 
    )
}

export default UserInput;