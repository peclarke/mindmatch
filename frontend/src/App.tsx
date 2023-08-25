import { useEffect } from 'react';
import './App.css'
import { WS_URL } from './globals';
import GameScreen from './screens/game'

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { NewGameScreen } from './screens/newGame';

const getMessage = (message: MessageEvent<any>): boolean => {
  const evt = JSON.parse(message.data);
  return evt.type === "test"
}

function App() {
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true
  });

  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: getMessage
  })

  const message = lastJsonMessage?.data || ""; // lol syntax highlighting fucking sucks

  const test = () => {
    sendJsonMessage({
      type: "test",
      content: "FUCK THIS"
    })
  }

  return (
    <>
      <GameScreen q={'Why god?'} a={'The answer is in the details'}/>
      {/* {message}
      <p>LOL WE FUCKING BALL</p>
      <button onClick={test}>asd</button> */}
      {/* <NewGameScreen /> */}
    </>
  )
}

export default App
