import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import React from 'react'
import GameResultGuesses from './GameResult/GameResultGuesses/GameResultGuesses'
import GameResultMap from './GameResult/GameResultMap/GameResultMap'
import s from './Result.module.scss'
import RoundResultsFooter from './ResultsFooter/ResultsFooter'
import RoundResultsGuesses from './RoundResult/RoundResultsGuesses/RoundResultsGuesses'
import RoundResultsMap from './RoundResult/RoundResultsMap/RoundResultsMap'
import RoundResultsHeader from './RoundResultsHeader/RoundResultsHeader'

function Result() {
  const { isGameEnd } = useAppSelector(getGameState)
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
