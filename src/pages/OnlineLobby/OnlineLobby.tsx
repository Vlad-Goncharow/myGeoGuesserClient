import { useAppSelector } from '@/hooks/useAppSelector'
import UseJoinRoom from '../../hooks/UseJoinRoom'
import useWebSocketHandler from '@/hooks/useWebSocketHandler'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import Game from './components/Game/Game'
import Lobby from './components/Lobby/Lobby'
import s from './OnlineLobby.module.scss'
import CreateTempUser from './components/CreateTempUser/CreateTempUser'

function OnlineLobby() {
  const { isConnected, isGameStart } = useAppSelector(getGameConfig)

  useWebSocketHandler()
  UseJoinRoom()

  if (!isConnected) {
    return <CreateTempUser />
  }

  return <div className={s.wrapper}>{isGameStart ? <Game /> : <Lobby />}</div>
}

export default OnlineLobby
