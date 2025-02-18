import { WebSocketContext } from '@/providers/WsProvider'
import { handleWebSocketEvents } from '@/utils/handleWebSocketEvents'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from './useAppSelector'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { useAppDispatch } from './useAppDispatch'
import { getTemporaryUser } from '@/redux/slices/TemporaryUserSlice/selectors/TemporaryUserSelectors'

function useWebSocketHandler() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isConnected, isGameEnd } = useAppSelector(getGameConfig)
  const { user } = useAppSelector(getAuth)
  const { temporaryUser } = useAppSelector(getTemporaryUser)

  const wsRef = React.useContext(WebSocketContext)

  const { roomId } = useParams()

  React.useEffect(() => {
    const currentUser = user || temporaryUser

    if (isConnected && roomId && wsRef && currentUser && wsRef.socket) {
      wsRef.socket.onmessage = (e: any) => {
        handleWebSocketEvents(e, dispatch, navigate, isGameEnd)
      }
    }
  }, [wsRef, roomId, user, isConnected, temporaryUser])
}

export default useWebSocketHandler
