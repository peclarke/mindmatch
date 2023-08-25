import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';

import './input.css';

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export type InputButtonProps = {
    type: "text" | "button" | "enter"
    defense?: boolean; 
}

const InputButton = (props: InputButtonProps) => {
    const [answer, setAnswer] = useState("");

    return (
        <div>
            {
                props.type === "text" 
                ? <TextField fullWidth={true} className="answerInput" variant="filled" value={answer} onChange={(e) => setAnswer(e.target.value)}></TextField>
                    : props.type === "button"
                ? <Button className="actionBtn" variant="contained">{props.defense ? "shield" : "sword"}</Button>
                    : props.type === "enter"
                ?   <Button className="enterBtn" variant="contained" fullWidth={true}>
                        <KeyboardReturnIcon />
                    </Button>
                    : "bro no way"
            }
        </div>
    )
}

const UserInput = () => {
    const [powerUp, setPowerUp] = useState<"sword" | "shield" | "">("");

    const changePowerUp = (value: "sword" | "shield" | "") => {
        if (powerUp === "") {setPowerUp(value); return }

        if (powerUp === value) {
            // toggle off
            setPowerUp("");
        } else {
            setPowerUp(value);
        }
    }

    return (
        <Grid container className="userInput" columnSpacing={3}>
            <Grid container item xs={10} rowSpacing={2}>
                <Grid item xs={12}>
                    <InputButton type="text"/>
                </Grid>
                <Grid item xs={12}>
                    <div className="action-buttons">
                        <Button className="actionBtn" variant="contained" onChange={() => changePowerUp("sword")}>Sword</Button>
                        <Button className="actionBtn" variant="contained" onChange={() => changePowerUp("shield")}>Shield</Button>
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={2} className="enterGridCell">
                <InputButton type="enter" />
            </Grid>
        </Grid> 
    )
}

export default UserInput;