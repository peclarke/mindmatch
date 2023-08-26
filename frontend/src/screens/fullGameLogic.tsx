import { useState } from "react";
import { NewGameScreen } from "./newGame";
import Full2GameLogic from "./full2GameLogic";

const FullGameLogic = () => {
    // const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [joining, setJoining] = useState<boolean>(false);

    return (
        <>
        {
            !loading && !joining
            ? <NewGameScreen 
                startLoading={() => setLoading(true)}
                startJoining={() => setJoining(true)}
              />
            : <Full2GameLogic
                joining={joining}
              />
        }
        </>
    )
}

export default FullGameLogic;