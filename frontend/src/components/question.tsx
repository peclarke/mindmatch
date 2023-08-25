import { Typography } from '@mui/material';
import './question.css';

// import playerOne from "https://www.nicepng.com/png/detail/307-3077846_moshi-monster-white-color-monkey-clipart-png-moshi.png";


export type QuestionCardProps = {
    q: string;
    a: string;
}

const QuestionCard = (props: QuestionCardProps) => {
    return (
        <div className="questionCard">
            <div className="questionContent">
                <Typography variant="overline" className="subtitle">
                    YOUR QUESTION:
                </Typography>
                <span className="question">
                    {props.q}
                </span>
            </div>
        </div>
    )
}

export default QuestionCard;