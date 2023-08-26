import { Grid } from "@mui/material";
// import UserInput from "../components/input";
// import QuestionCard, { QuestionCardProps } from "../components/question";

import './game.css';
import QuestionCard, { QuestionCardProps } from "../components/question/question";
import UserInput from "../components/input/input";
import PlayerCard from "../components/player/player";
import { useState } from "react";

const GameScreen = (props: QuestionCardProps) => {
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);

    return (
        <section>
            <Grid container>
                <Grid item xs={4} className="playerColumns">
                    {/* maybe some scores for player 1? animation comes form this side */}
                    <PlayerCard number={1} name="Bob Jenkins"/>
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
                        />
                    </div>
                </Grid>
                <Grid item xs={4} className="playerColumns">
                    <PlayerCard number={2} name="Alice Actions"/>
                </Grid>
            </Grid>
        </section>
    )
}

export default GameScreen;