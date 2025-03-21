import React from 'react'
import Controls from './components/Controls/Controls'
import RoomUsers from './components/RoomUsers/RoomUsers'
import GameSettings from './components/GameSettings/GameSettings'
import MiniGame from './components/MiniGame/MiniGame'
import s from './Lobby.module.scss'
import { RoomId } from '@/Components/RoomId/RoomId'

function Lobby() {
  return (
    <>
      <div className={s.left}>
        <GameSettings />
        <MiniGame />
      </div>
      <div className={s.right}>
        <RoomId />
        <RoomUsers />
        <Controls />
      </div>
    </>
  )
}

export default Lobby
