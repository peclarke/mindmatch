import { Button, Grid, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

import './input.css';
// import '../../public/sword.png';
// import 'shield.png';

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

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

    return (
        <div>
            {
                props.type === "text" 
                ? <TextField onKeyDown={(e) => handleKeyDown(e)} disabled={props.disabled} fullWidth={true} className="answerInput" variant="filled" value={answer} onChange={(e) => setAnswer(e.target.value)}></TextField>
                    : props.type === "button"
                ? <Button className="actionBtn" variant="contained">{props.defense ? "shield" : "sword"}</Button>
                    : props.type === "enter"
                ? <Tooltip title="Submit answer">
                    <Button disabled={props.disabled} onClick={() => props.submitAns ? props.submitAns(answer) : null} className="enterBtn" variant="contained" fullWidth={true}>
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
}

const UserInput = (props: UserInputProps) => {
    const [powerUp, setPowerUp] = useState<"sword" | "shield" | "">("");
    // const [disableInput, setDisableInput] = useState(false);

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
        
        // update server
        console.log(answer);
    }



    return (
        <Grid container className="userInput" columnSpacing={3}>
            <Grid container item xs={10}>
                <Grid item xs={12} className={props.disabled ? "parentAnswerInput disabled" : "parentAnswerInput enabled"}>
                    <InputButton type="text" disabled={props.disabled} submitAns={submitAnswer}/>
                </Grid>
                <Grid item xs={12}>
                    <div className="action-buttons">
                        <Tooltip title="Double your attack">
                            <Button disabled={props.disabled} className="actionBtn" variant="contained" onChange={() => changePowerUp("sword")}>
                                <img src="./sword.png" alt="double attack button" className={props.disabled ? "img-disabled" : "" }/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Defend against opponent">
                            <Button disabled={props.disabled} className="actionBtn" variant="contained" onChange={() => changePowerUp("shield")}>
                                <img src="./shield.png" alt="defend button" className={props.disabled ? "img-disabled" : "" }/>
                            </Button>
                        </Tooltip>
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={2} className="enterGridCell">
                <InputButton disabled={props.disabled} type="enter" submitAns={submitAnswer}/>
            </Grid>
        </Grid> 
    )
}

export default UserInput;