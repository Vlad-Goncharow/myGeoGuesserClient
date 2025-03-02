import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import { getTemporaryUser } from '@/redux/slices/TemporaryUserSlice/selectors/TemporaryUserSelectors'
import { handleWebSocketEvents } from '@/utils/handleWebSocketEvents'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

function useWebSocketHandler() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isConnected, isGameEnd } = useAppSelector(getGameState)
  const { user } = useAppSelector(getAuth)
  const { temporaryUser } = useAppSelector(getTemporaryUser)

  const wsRef = React.useContext(WebSocketContext)

  const { roomId } = useParams()

  React.useEffect(() => {
    const currentUser = user || temporaryUser

    if (isConnected && roomId && wsRef && currentUser && wsRef.socket) {
      wsRef.socket.onmessage = (e: MessageEvent<string>) => {
        handleWebSocketEvents(e, dispatch, navigate, isGameEnd)
      }
    }
  }, [
    wsRef,
    roomId,
    user,
    isConnected,
    temporaryUser,
    dispatch,
    navigate,
    isGameEnd,
  ])
}

export default useWebSocketHandler
