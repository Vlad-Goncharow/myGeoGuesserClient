import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import GameResultMap from './GameResult/GameResultMap/GameResultMap'
import RoundResultsMap from './RoundResult/RoundResultsMap/RoundResultsMap'
import RoundResultsHeader from './RoundResultsHeader/RoundResultsHeader'
import RoundResultsGuesses from './RoundResult/RoundResultsGuesses/RoundResultsGuesses'
import RoundResultsFooter from './ResultsFooter/ResultsFooter'
import GameResultGuesses from './GameResult/GameResultGuesses/GameResultGuesses'
import s from './Result.module.scss'

function Result() {
  const { isGameEnd } = useAppSelector(getGameConfig)
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__left}>
        {isGameEnd ? <GameResultMap /> : <RoundResultsMap />}
      </div>
      <div className={s.wrapper__right}>
        <RoundResultsHeader />
        {isGameEnd ? <GameResultGuesses /> : <RoundResultsGuesses />}
        <RoundResultsFooter />
      </div>
    </div>
  )
}

export default Result
