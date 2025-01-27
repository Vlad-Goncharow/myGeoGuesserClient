import React from 'react'
import Controls from './components/Controls'
import CurrentRoundPlayers from './components/CurrentRoundPlayers'
import RoundInfo from './components/RoundInfo'

function PlayersSidebar() {
  return (
    <div className='current-round-players-sidebar'>
      <RoundInfo />
      <CurrentRoundPlayers />
      <Controls />
    </div>
  )
}

export default PlayersSidebar
