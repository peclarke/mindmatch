import { useMemo, useState } from "react";
import { NewGameScreen } from "./newGame";
import Full2GameLogic from "./full2GameLogic";
import { NameContext } from "../main";
import LandingScreen from "./landing/landing";

const FullGameLogic = () => {
    const [names, setNames] = useState(["Player 1", "Player 2"]);
    const stateValue = useMemo(
        () => ({names, setNames}), [names]
    )

    // const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [joining, setJoining] = useState<boolean>(false);

    const [qa, setQa] = useState<{q: string; a: string;}[]>();

    return (
        <>
        <NameContext.Provider value={stateValue}>
            {
                !loading && !joining
                // ? <NewGameScreen 
                //     startLoading={() => setLoading(true)}
                //     startJoining={() => setJoining(true)}
                // />
                ? <LandingScreen 
                    startLoading={() => setLoading(true)}
                    startJoining={() => setJoining(true)}
                    setQa={(val: any) => setQa(val)}
                  />
                : <Full2GameLogic
                    joining={joining}
                    cardDeck={qa ? qa : [{q: "", a: ""}]}
                />
            }
        </NameContext.Provider>
        </>
    )
}

export default FullGameLogic;