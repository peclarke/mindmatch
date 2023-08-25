import { Grid } from "@mui/material";
import UserInput from "../components/input";
import QuestionCard, { QuestionCardProps } from "../components/question";

import './game.css';

const GameScreen = (props: QuestionCardProps) => {
    return (
        <section>
            <Grid container>
                <Grid item xs={4}>
                    {/* maybe some scores for player 1? animation comes form this side */}
                </Grid>
                <Grid item xs={4}>
                    <div className="middleColumn">
                        <QuestionCard 
                            q={props.q}
                            a={props.a}
                        />
                        <UserInput />
                    </div>
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </section>
    )
}

export default GameScreen;