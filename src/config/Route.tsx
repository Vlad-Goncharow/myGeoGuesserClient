import React from 'react'
import App from '@/App'
import Home from '@/pages/Home/Home'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import OnlineLobby from '@/pages/OnlineLobby/OnlineLobby'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/online-lobby/:roomId' element={<OnlineLobby />} />
    </Route>
  )
)
