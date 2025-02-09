import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import AuthModals from './Components/Modals/AuthModals/AuthModals'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchAuth } from './redux/slices/AuthSlice/thunks'
import './styles/style.scss'
import GameSettingsModals from './Components/Modals/GameSettingsModals/GameSettingsModals'
import ApiKeyModal from './Components/Modals/ApiKeyModal/ApiKeyModal'
import UseLoadGoogleMaps from './hooks/UseLoadGoogleMaps'

function App() {
  UseLoadGoogleMaps()

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
        <Outlet />
      </main>

      <ApiKeyModal />
      <GameSettingsModals />
      <AuthModals />

      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
