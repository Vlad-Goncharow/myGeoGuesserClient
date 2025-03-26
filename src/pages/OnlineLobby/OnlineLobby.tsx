import { useAppSelector } from '@/hooks/useAppSelector'
import useExitConfirmation from '@/hooks/useExitConfirmation'
import useWebSocketHandler from '@/hooks/useWebSocketHandler'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import React from 'react'
import UseJoinRoom from '../../hooks/UseJoinRoom'
import Lobby from './components/Lobby/Lobby'
import s from './OnlineLobby.module.scss'
import Game from '@/Components/Game/Game'

function OnlineLobby() {
  const { isGameStart, isRoomFull } = useAppSelector(getGameState)

  useExitConfirmation()
  useWebSocketHandler()
  UseJoinRoom()

  return (
    <div className={s.wrapper}>
      {!isRoomFull && (isGameStart ? <Game /> : <Lobby />)}
    </div>
  )
}

export default OnlineLobby
