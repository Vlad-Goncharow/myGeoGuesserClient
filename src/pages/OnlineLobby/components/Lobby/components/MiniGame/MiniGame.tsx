import UseMiniGames from '@/hooks/UseMiniGames'
import classNames from 'classnames'
import React from 'react'
import Countries from './Components/Countries/Countries'
import GlobeComp from './Components/GlobeComp/GlobeComp'
import MinigameControls from './Components/MinigameControls/MinigameControls'
import s from './MiniGame.module.scss'
import { GlobeMethods } from 'react-globe.gl'

function MiniGame() {
  const { checkCountryGuess } = UseMiniGames()

  const globeGlobeRef = React.useRef<GlobeMethods | undefined>(undefined)

  return (
    <div className={s.game}>
      <div
        className={classNames(s.answer, {
          [s.answer_correct]: checkCountryGuess === true,
          [s.answer_incorrect]: checkCountryGuess === false,
        })}
      ></div>
      <GlobeComp globeGlobeRef={globeGlobeRef} />
      <MinigameControls />
      <Countries globeGlobeRef={globeGlobeRef} />
    </div>
  )
}

export default MiniGame
