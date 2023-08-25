import { Grid } from "@mui/material";
import UserInput from "../components/input";
import QuestionCard from "../components/question";

import './game.css';

const GameScreen = () => {
    return (
        <section>
            <Grid container>
                <Grid item xs={4}>
                    {/* maybe some scores for player 1? animation comes form this side */}
                </Grid>
                <Grid item xs={4}>
                    <QuestionCard />
                    <UserInput />
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </section>
    )
}

export default GameScreen;