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
                    <div className="middleColumn">
                        <QuestionCard 
                            question='Why does music written in a minor key sound "sad" in comparison to major?'
                            answer="Because minor music flattens the third and that's all I know"
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