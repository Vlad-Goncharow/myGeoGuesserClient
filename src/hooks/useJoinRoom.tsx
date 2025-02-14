import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { gameConfigActions } from '@/redux/slices/GameConfig/slice/GameConfigSlice'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { getTemporaryUser } from '@/redux/slices/TemporaryUserSlice/selectors/TemporaryUserSelectors'

function UseJoinRoom() {
  const dispatch = useAppDispatch()
  const wsRef = React.useContext(WebSocketContext)
  const { roomId } = useParams()
  const { user } = useAppSelector(getAuth)
  const { temporaryUser } = useAppSelector(getTemporaryUser)
  const { isConnected } = useAppSelector(getGameConfig)
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
        dispatch(gameConfigActions.setIsConnected(true))
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
