import Nav from '../../components/nav';
import './final.css';

export type StatType = {
    winner: {
        correct:   number;
        incorrect: number;
        avatar:    string;
    },
    loser: {
        correct:   number;
        incorrect: number;
        avatar:    string;
    }
}

export type FinalScreenProps = {
    winner: string;
    loser:  string;
    stats:  StatType;
}

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
    return (
        <>
        <Nav />
        <section>
            <div className="pillars">
                <div className="win">
                    <img src="./crown.png" id="crown"/>
                    <span className="pillarName">{props.winner}</span>
                    <span><strong>12</strong> correct</span>
                    <span><strong>3</strong> incorrect</span>
                    <img src={"./repogotchi1.png"} className="finalAv"/>
                </div>
                <div className="lose">
                    <span className="pillarName">{props.loser}</span>
                    <span><strong>3</strong> correct</span>
                    <span><strong>12</strong> incorrect</span>
                    <img src={"./repogotchi2.png"} className="finalAv"/>
                </div>
            </div>
        </section>
        </>
    )
}

export default FinalScreen;