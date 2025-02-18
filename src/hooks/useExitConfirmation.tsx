import { WebSocketContext } from '@/providers/WsProvider'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useExitConfirmation = () => {
  const wsRef = React.useContext(WebSocketContext)
  const navigate = useNavigate()

  useEffect(() => {
    const handlePopState = () => {
      if (wsRef) {
        wsRef.disconnect()
        navigate('/')
      }
    }
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])
}

export default useExitConfirmation
