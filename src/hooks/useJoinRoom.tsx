import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import { gameActions } from '@/redux/slices/Game/slice/GameSlice'
import { getTemporaryUser } from '@/redux/slices/TemporaryUserSlice/selectors/TemporaryUserSelectors'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

function UseJoinRoom() {
  const dispatch = useAppDispatch()
  const wsRef = React.useContext(WebSocketContext)
  const { roomId } = useParams()
  const { user } = useAppSelector(getAuth)
  const { temporaryUser } = useAppSelector(getTemporaryUser)
  const { isConnected } = useAppSelector(getGameState)
  const hasJoinedRoom = React.useRef(false)

  React.useEffect(() => {
    if (!wsRef || !roomId) return

    if (!isConnected) {
      wsRef.connect()
    }

    const currentUser = user || temporaryUser

    const handleOpen = () => {
      if (currentUser && !hasJoinedRoom.current) {
        wsRef.joinRoom(roomId, currentUser)
        hasJoinedRoom.current = true
        dispatch(gameActions.setIsConnected(true))
      }
    }

    if (wsRef.socket?.readyState === WebSocket.OPEN) {
      handleOpen()
    } else {
      wsRef.socket?.addEventListener('open', handleOpen, { once: true })
    }

    return () => {
      wsRef.socket?.removeEventListener('open', handleOpen)
    }
  }, [isConnected, wsRef, roomId, user, temporaryUser, dispatch])
}

export default UseJoinRoom
