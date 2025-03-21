import React from 'react'
import App from '@/App'
import Home from '@/pages/Home/Home'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import OnlineLobby from '@/pages/OnlineLobby/OnlineLobby'
import ProfileSettings from '@/pages/ProfileSettings/ProfileSettings'
import JoinLobby from '@/pages/JoinLobby/JoinLobby'
import QuickPlay from '@/pages/QuickPlay/QuickPlay'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/online-lobby/:roomId' element={<OnlineLobby />} />
      <Route path='/settings/:type' element={<ProfileSettings />} />
      <Route path='/join/:lobbyId' element={<JoinLobby />} />
      <Route path='/quick-match/:roomId' element={<QuickPlay />} />
    </Route>
  )
)
