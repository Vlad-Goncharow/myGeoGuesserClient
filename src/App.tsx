import ErthSpin from '@/assets/video/earthSpin.webm'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import AuthModals from './Components/Modals/AuthModals/AuthModals'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchAuth } from './redux/slices/AuthSlice/thunks'
import './styles/style.scss'

function App() {
  const dispatch = useAppDispatch()
  const auth = async () => {
    const data = await dispatch(fetchAuth())

    if (data.payload !== undefined && 'accessToken' in data.payload) {
      window.localStorage.setItem('token', data.payload.accessToken)
    }
  }

  React.useEffect(() => {
    auth()
  }, [])

  return (
    <div id='app'>
      <Header />

      <main id='main'>
        <video id="background-video" autoPlay muted loop>
          <source src={ErthSpin} type="video/mp4" />
        </video>
        <Outlet />
      </main>

      <AuthModals />
      
      <Footer />
    </div>
  )
}

export default App
