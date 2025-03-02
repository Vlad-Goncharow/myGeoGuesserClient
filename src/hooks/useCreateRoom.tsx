import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { gameActions } from '@/redux/slices/Game/slice/GameSlice'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

function useCreateRoom() {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(getAuth)
  const wsRef = React.useContext(WebSocketContext)

  const navigate = useNavigate()

  const createOnlineLobby = () => {
    if (wsRef) {
      wsRef.connect()

      if (wsRef.socket && user) {
        wsRef.socket.onopen = () => {
          dispatch(gameActions.setIsConnected(true))
          wsRef.createRoom(user.id)
        }

        wsRef.socket.onmessage = (e) => {
          const data = JSON.parse(e.data)

          if (data.event === 'roomCreated') {
            navigate(`/online-lobby/${data.payload.roomId}`)

            toast.success('Room created', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
          }
        }
      }
    }
  }

  return { createOnlineLobby }
}

export default useCreateRoom
