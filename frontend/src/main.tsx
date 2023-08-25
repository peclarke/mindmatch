import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LoadingScreen, NewGameScreen } from './screens/newGame.tsx';
import ErrorElement from './components/error.tsx';
import GameScreen from './screens/game.tsx';

const router = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        element: <NewGameScreen />
      },
      {
        path: '/play/:gameId',
        element: <LoadingScreen />
      },
      {
        path: '/game',
        element: <GameScreen q={'Why god?'} a={'So true'}/>
      }
    ]
  } 
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
