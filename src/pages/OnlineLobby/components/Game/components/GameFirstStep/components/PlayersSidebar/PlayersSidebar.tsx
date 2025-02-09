import React from 'react'
import Controls from './components/Controls/Controls'
import CurrentRoundPlayers from './components/CurrentRoundPlayers'
import RoundInfo from './components/RoundInfo/RoundInfo'
import s from './PlayersSidebar.module.scss'

function PlayersSidebar() {
  return (
    <div className={s.wrapper}>
      <RoundInfo />
      <CurrentRoundPlayers />
      <Controls />
    </div>
  )
}

export default PlayersSidebar
