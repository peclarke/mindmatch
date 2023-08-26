import useWebSocket from "react-use-websocket"
import { WS_URL } from "../globals"
import { useEffect, useState } from "react";

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

    const updateState = (results) => {
        if (!results["1"] && !results["2"]) {
            props.takeHeart(3);
        } else if (!results["1"]) {
            props.takeHeart(1);
        } else if (!results["2"]) {
            props.takeHeart(2);
        }
    }

    useEffect(() => {
        console.log(lastJsonMessage)
        if (lastJsonMessage) {
            console.log(lastJsonMessage?.content)
            setFinalAnswer(lastJsonMessage?.content);
            updateState(lastJsonMessage?.content);
        }
    }, [lastJsonMessage])

    return (
        <></>
    )
}

export const NewQuestionListener = (props: NewQuestionListenerProps) => {
    const { lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        filter: NewQuestionConfirm
    })

    useEffect(() => {
        if (lastJsonMessage) {
            console.log(lastJsonMessage);

            const q = lastJsonMessage?.content["question"];
            const a = lastJsonMessage?.content["answer"];

            props.setQuestion({
                q: q,
                a: a,
                loaded: true
            });

            props.setDisabled(false);
        }   
    }, [lastJsonMessage])

    return (
        <></>
    )
}

export const ResultScreen = () => {
    return (
        <section></section>
    )
}

