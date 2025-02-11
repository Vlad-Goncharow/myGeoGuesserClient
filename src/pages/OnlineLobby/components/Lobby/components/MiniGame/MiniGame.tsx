import UseMiniGames from '@/hooks/UseMiniGames'
import classNames from 'classnames'
import React from 'react'
import Countries from './Components/Countries/Countries'
import GlobeComp from './Components/GlobeComp/GlobeComp'
import MinigameControls from './Components/MinigameControls/MinigameControls'
import s from './MiniGame.module.scss'

function MiniGame() {
  const { checkCountryGuess } = UseMiniGames()

  const globeGlobeRed = React.useRef<any>()

  return (
    <div className={s.game}>
      <div
        className={classNames(s.answer, {
          [s.answer_correct]: checkCountryGuess === true,
          [s.answer_incorrect]: checkCountryGuess === false,
        })}
      ></div>
      <GlobeComp globeGlobeRed={globeGlobeRed} />
      <MinigameControls />
      <Countries globeGlobeRed={globeGlobeRed} />
    </div>
  )
}

export default MiniGame
