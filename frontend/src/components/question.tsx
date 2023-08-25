import './question.css';

import playerOne from "https://www.nicepng.com/png/detail/307-3077846_moshi-monster-white-color-monkey-clipart-png-moshi.png";


export type QuestionCardProps = {
    question: string;
    answer: string;
}

const QuestionCard = (props: QuestionCardProps) => {
    return (
        <div className="questionCard">
            <img src={playerOne} />
            <span className="question">
                {props.question}
            </span>
        </div>
    )
}

export default QuestionCard;