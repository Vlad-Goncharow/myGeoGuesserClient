import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Modals from './Components/Modals/Modals'
import { useAppDispatch } from './hooks/useAppDispatch'
import UseLoadGoogleMaps from './hooks/UseLoadGoogleMaps'
import { fetchAuth } from './redux/slices/AuthSlice/thunks'
import './styles/style.scss'

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

      <Modals />

      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
