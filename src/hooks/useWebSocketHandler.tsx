import { WebSocketContext } from '@/providers/WsProvider'
import { handleWebSocketEvents } from '@/utils/handleWebSocketEvents'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from './useAppSelector'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { useAppDispatch } from './useAppDispatch'

function useWebSocketHandler() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isConnected, isGameEnd } = useAppSelector(getGameConfig)
  const { user } = useAppSelector(getAuth)

  const wsRef = React.useContext(WebSocketContext)

  const { roomId } = useParams()

  React.useEffect(() => {
    if (isConnected && roomId && wsRef && user && wsRef.socket) {
      wsRef.socket.onmessage = (e: any) => {
        handleWebSocketEvents(e, dispatch, navigate, isGameEnd)
      }
    }
  }, [wsRef, roomId, user, isConnected])
}

export default useWebSocketHandler
