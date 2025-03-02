import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Modals from './Components/Modals/Modals'
import useAuth from './hooks/useAuth'
import UseLoadGoogleMaps from './hooks/UseLoadGoogleMaps'
import './styles/style.scss'

function App() {
  UseLoadGoogleMaps()
  useAuth()

  return (
    <div id='app'>
      <Header />

      <main id='main'>
        <Outlet />
      </main>

      <Modals />

      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
