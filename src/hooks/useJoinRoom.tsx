import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { gameConfigActions } from '@/redux/slices/GameConfig/slice/GameConfigSlice'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

function useJoinRoom() {
  const dispatch = useAppDispatch()
  const wsRef = React.useContext(WebSocketContext)
  const { roomId } = useParams()
  const { user } = useAppSelector(getAuth)
  const { isConnected } = useAppSelector(getGameConfig)
  const hasJoinedRoom = React.useRef(false)

  React.useEffect(() => {
    if (isConnected && wsRef && roomId && user && !hasJoinedRoom.current) {
      wsRef.joinRoom(roomId, user)
      hasJoinedRoom.current = true
    }

    if (!isConnected && wsRef) {
      wsRef.connect()
      dispatch(gameConfigActions.setIsConnected(true))
    }
  }, [isConnected, wsRef, roomId, user, dispatch])
}

export default useJoinRoom
