import Nav from '../../components/nav';
import anime from 'animejs/lib/anime.es.js';
import './final.css';
import { useEffect } from 'react';

export type StatType = {
    winner: {
        name:      string;
        correct:   number;
        incorrect: number;
        number:    number;
        avatar:    string;
    },
    loser: {
        name:      string;
        correct:   number;
        incorrect: number;
        number:    number;
        avatar:    string;
    }
}

export type FinalScreenProps = StatType;

/**
 * This screen is shown on one of two win conditions:
 * 1) we have reached the end of the question list.
 * 2) one of the players has reached 0 lives remaining.
 * 
 * This screen must show who WON, who LOST, some more STATS about
 * their game, and give the option for a rematch. 
 * 
 * If they choose not to rematch, at this point we close all connections
 * and send them on their way.
 * @returns 
 */
const FinalScreen = (props: FinalScreenProps) => {
    useEffect(() => {
        anime({
            targets: '.win',
            scaleY: [0, 1], // Scale from 0 to 1 vertically
            duration: 1500,
            direction: "begin"
        });
        anime({
            targets: '.lose',
            scaleY: [0, 1], // Scale from 0 to 1 vertically
            duration: 1500,
            direction: "begin",
            delay: 500
        });
    }, [])

    console.log(props.winner.number);

    return (
        <>
        <Nav />
        <section>
            <div className="pillars">
                <div className="win">
                    <img src="./crown.png" id="crown"/>
                    <span className="pillarName">{props.winner.name}</span>
                    <span><strong>{props.winner.correct}</strong> correct</span>
                    <span><strong>{props.winner.incorrect}</strong> incorrect</span>
                    <img src={"./repogotchi"+props.winner.number+".png"} className="finalAv"/>
                </div>
                <div className="lose">
                    <span className="pillarName">{props.loser.name}</span>
                    <span><strong>{props.loser.correct}</strong> correct</span>
                    <span><strong>{props.loser.incorrect}</strong> incorrect</span>
                    <img src={"./repogotchi"+props.loser.number+".png"} className="finalAv"/>
                </div>
            </div>
        </section>
        </>
    )
}

export default FinalScreen;