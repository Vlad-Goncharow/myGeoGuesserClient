import React from 'react'
import GameMapMode from './components/GameMapMode/GameMapMode'
import PlayersSidebar from './components/PlayersSidebar/PlayersSidebar'
import Sidebar from './components/Sidebar/Sidebar'
import s from './GameFirstStep.module.scss'

function GameFirstStep() {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__game}>
        <GameMapMode />
        <Sidebar />
      </div>
      <PlayersSidebar />
    </div>
  )
}

export default GameFirstStep
