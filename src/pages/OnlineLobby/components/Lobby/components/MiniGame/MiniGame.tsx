import React from 'react'
import GlobeComp from './Components/GlobeComp/GlobeComp'
import MinigameControls from './Components/MinigameControls/MinigameControls'
import s from './MiniGame.module.scss'

function MiniGame() {
  return (
    <div className={s.game}>
      <GlobeComp />
      <MinigameControls />
    </div>
  )
}

export default MiniGame
