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
                ? <TextField fullWidth={true} className="answerInput" variant="standard" value={answer} onChange={(e) => setAnswer(e.target.value)}></TextField>
                    : props.type === "button"
                ? <Button className="actionBtn" variant="contained">{props.defense ? "shield" : "sword"}</Button>
                    : props.type === "enter"
                ? <Button className="enterBtn"><KeyboardReturnIcon /></Button>
                    : "bro no way"
            }
        </div>
    )
}

const UserInput = () => {
    return (
        <Grid container className="userInput">
            <Grid container item xs={8} rowSpacing={2}>
                <Grid item xs={12}>
                    <InputButton type="text"/>
                </Grid>
                <Grid item xs={6}>
                    <InputButton type="button"/>
                </Grid>
                <Grid item xs={6}>
                    <InputButton type="button" defense={true}/>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <InputButton type="enter" />
            </Grid>
        </Grid> 
    )
}

export default UserInput;