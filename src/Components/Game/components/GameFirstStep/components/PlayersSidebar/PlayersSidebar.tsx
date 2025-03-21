import React from 'react'
import Controls from './components/Controls/Controls'
import RoundInfo from './components/RoundInfo/RoundInfo'
import s from './PlayersSidebar.module.scss'
import PlayersByGameMode from './components/PlayersByGameMode/PlayersByGameMode'

function PlayersSidebar() {
  return (
    <div className={s.wrapper}>
      <RoundInfo />
      <PlayersByGameMode />
      <Controls />
    </div>
  )
}

export default PlayersSidebar
