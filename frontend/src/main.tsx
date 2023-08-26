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
import FullGameLogic from './screens/fullGameLogic.tsx';
import FinalScreen from './screens/final/final.tsx';

const router = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    children: [
      // {
      //   path: '/',
      //   element: <NewGameScreen />
      // },
      // {
      //   path: '/play/:gameId',
      //   element: <LoadingScreen />
      // },
      {
        path: '/',
        element: <FullGameLogic />
      },
      {
        path: '/dev',
        element: <FinalScreen winner="Bill Jeff" loser="Alice Affrey"/>
      }
    ]
  } 
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
