import { Button, Grid, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';

import './input.css';
// import '../../public/sword.png';
// import 'shield.png';

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
                ? <Tooltip title="Submit answer"><Button className="enterBtn" variant="contained" fullWidth={true}>
                        <KeyboardReturnIcon sx={{height: 128}}/>
                    </Button></Tooltip>
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
            <Grid container item xs={10}>
                <Grid item xs={12} className="parentAnswerInput">
                    <InputButton type="text"/>
                </Grid>
                <Grid item xs={12}>
                    <div className="action-buttons">
                        <Tooltip title="Double your attack">
                            <Button className="actionBtn" variant="contained" onChange={() => changePowerUp("sword")}>
                                <img src="./sword.png" alt="double attack button"/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Defend against opponent">
                            <Button className="actionBtn" variant="contained" onChange={() => changePowerUp("shield")}>
                                <img src="./shield.png" alt="defend button"/>
                            </Button>
                        </Tooltip>
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