import { useAppSelector } from '@/hooks/useAppSelector'
import useJoinRoom from '@/hooks/useJoinRoom'
import useWebSocketHandler from '@/hooks/useWebSocketHandler'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import Game from './components/Game/Game'
import Lobby from './components/Lobby/Lobby'

function OnlineLobby() {
  const { isConnected, isGameStart } = useAppSelector(getGameConfig)

  useWebSocketHandler()
  useJoinRoom()

  if (!isConnected) {
    return <div>not connected</div>
  }

  return <div className='lobby'>{isGameStart ? <Game /> : <Lobby />}</div>
}

export default OnlineLobby
