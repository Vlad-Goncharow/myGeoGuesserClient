import React from 'react'
import LobbyId from './components/LobbyId/LobbyId'
import Controls from './components/Controls/Controls'
import RoomUsers from './components/RoomUsers/RoomUsers'
import GameSettings from './components/GameSettings/GameSettings'
import MiniGame from './components/MiniGame/MiniGame'
import s from './Lobby.module.scss'

function Lobby() {
  return (
    <>
      <div className={s.left}>
        <GameSettings />
        <MiniGame />
      </div>
      <div className={s.right}>
        <LobbyId />
        <RoomUsers />
        <Controls />
      </div>
    </>
  )
}

export default Lobby
