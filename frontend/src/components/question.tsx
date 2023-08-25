import './question.css';

// import playerOne from "https://www.nicepng.com/png/detail/307-3077846_moshi-monster-white-color-monkey-clipart-png-moshi.png";


export type QuestionCardProps = {
    q: string;
    a: string;
}

const QuestionCard = (props: QuestionCardProps) => {
    return (
        <div className="questionCard">
            <span className="question">
                {props.q}
            </span>
        </div>
    )
}

export default QuestionCard;