import React from 'react'
import GameMapMode from './components/GameMapMode/GameMapMode'
import PlayersSidebar from './components/PlayersSidebar/PlayersSidebar'
import Sidebar from './components/Sidebar'

function GameFirstStep() {
  return (
    <div className='current-round'>
      <div className='current-round__game'>
        <GameMapMode />
        <Sidebar />
      </div>
      <PlayersSidebar />
    </div>
  )
}

export default GameFirstStep
