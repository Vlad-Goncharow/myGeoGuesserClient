import { useAppSelector } from '@/hooks/useAppSelector'
import useExitConfirmation from '@/hooks/useExitConfirmation'
import useWebSocketHandler from '@/hooks/useWebSocketHandler'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import UseJoinRoom from '../../hooks/UseJoinRoom'
import Game from './components/Game/Game'
import Lobby from './components/Lobby/Lobby'
import s from './OnlineLobby.module.scss'

function OnlineLobby() {
  const { isGameStart } = useAppSelector(getGameConfig)

  useExitConfirmation()
  useWebSocketHandler()
  UseJoinRoom()

  return <div className={s.wrapper}>{isGameStart ? <Game /> : <Lobby />}</div>
}

export default OnlineLobby
