import React from 'react'
import TimeRounds from './components/TimeRounds'
import LobbyId from './components/LobbyId'
import Controls from './components/Controls'
import RoomUsers from './components/RoomUsers'

function Lobby() {
  return (
    <>
      <div className='lobby__left'>
        <TimeRounds />
      </div>
      <div className='lobby__right'>
        <LobbyId />
        <RoomUsers />
        <Controls />
      </div>
    </>
  )
}

export default Lobby
