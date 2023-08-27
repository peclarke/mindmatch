import useWebSocket from "react-use-websocket"
import { WS_URL } from "../globals"
import { useEffect, useState } from "react";
import anime from 'animejs/lib/anime.es.js';
import './results.css';

export const EndTurnConfirm = (message: MessageEvent<any>): boolean => {
    const evt = JSON.parse(message.data);
    return evt.type === "endturn"
}

export const NewQuestionConfirm = (message: MessageEvent<any>): boolean => {
    const evt = JSON.parse(message.data);
    return evt.type === "newquestion"
}

export type FinalAnswer = Record<string, boolean>;

export type NewQuestionListenerProps = {
    lives: Record<number, number>;
    setQuestion: React.Dispatch<React.SetStateAction<{
        q: string;
        a: string;
        loaded: boolean;
    }>>
    setDisabled: (val: boolean) => void;
}

export type EndTurnListenerProps = {
    takeHeart: (player: number) => void;
    useShield: (player: number) => void;
    useSword:  (player: number) => void;
}

export const EndTurnListener = (props: EndTurnListenerProps) => {
    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: EndTurnConfirm
    })

    const [finalAnswer, setFinalAnswer] = useState<FinalAnswer>({});

    const updateState = (results: any) => {
        if (!results["1"] && !results["2"]) {
            props.takeHeart(3);
        } else if (!results["1"]) {
            props.takeHeart(1);
        } else if (!results["2"]) {
            props.takeHeart(2);
        }
    }

    useEffect(() => {
        if (lastJsonMessage) {
            setFinalAnswer(lastJsonMessage?.content);
            updateState(lastJsonMessage?.content);
        }
    }, [lastJsonMessage])

    return (
        <></>
    )
}

export const NewQuestionListener = (props: NewQuestionListenerProps) => {
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
      });

    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: NewQuestionConfirm
    })

    const delayedResponse = () => {
        const q = lastJsonMessage?.content["question"];
        const a = lastJsonMessage?.content["answer"];

        props.setQuestion({
            q: q,
            a: a,
            loaded: true
        });

        props.setDisabled(false);

        // setIcons(<></>)
    }

    const animatedIcons = <>
        <div className="biganis">
            <img src="./sword.png"/>
        </div>
        <></>
        <div className="biganis2">
            <img src="./sword-flip.png"/>
        </div>
    </>

    const [icons, setIcons] = useState(animatedIcons);

    const [hoop, setHoop] = useState(false);

    useEffect(() => {
        if (lastJsonMessage) {
            // check lives
            console.log(props.lives);
            // if (props.lives[0] <= 1) {
            //     sendJsonMessage({
            //         type: "playerdead",
            //         content: 1
            //     })
            //     return;
            // } else if (props.lives[1] <= 1) {
            //     sendJsonMessage({
            //         type: "playerdead",
            //         content: 2
            //     })
            //     return;
            // }

            setIcons(animatedIcons);

            setHoop(true);

            const r: anime.AnimeInstance = anime({
                targets: ".biganis2>img:first-child",
                translateX: {
                    value: "-60vw",
                    duration: 1000
                },
                opacity: {
                    value: '0',
                    delay: 800,
                    duration: 3000,
                    direction: "alternate"
                },
                changeComplete: (r: anime.AnimeInstance) => r.restart()
            })

            const l: anime.AnimeInstance = anime({
                targets: ".biganis>img:first-child",
                translateX: {
                    value: "60vw",
                    duration: 1000
                },
                opacity: {
                    value: '0',
                    delay: 800,
                    duration: 3000
                },
                changeComplete: (l: anime.AnimeInstance) => l.restart()
            })

            setTimeout(delayedResponse, 2000);
            setTimeout(() => setHoop(false), 2000);
        }   
    }, [lastJsonMessage])

    return (
        <>
            <div className={!hoop ? "biganis" : "biganis blackBack"}>
                <img src="./sword.png"/>
            </div>
            <></>
            <div className={!hoop ? "biganis2" : "biganis2 blackBack"}>
                <img src="./sword-flip.png"/>
            </div>
        </>
    )
}

export const ResultScreen = () => {
    return (
        <section></section>
    )
}

