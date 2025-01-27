import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import GameResultMap from './GameResult/GameResultMap/GameResultMap'
import RoundResultsMap from './RoundResult/RoundResultsMap/RoundResultsMap'
import RoundResultsHeader from './RoundResult/RoundResultsHeader'
import RoundResultsGuesses from './RoundResult/RoundResultsGuesses/RoundResultsGuesses'
import RoundResultsFooter from './RoundResult/RoundResultsFooter'
import GameResultGuesses from './GameResult/GameResultGuesses/GameResultGuesses'

function Result() {
  const { isGameEnd } = useAppSelector(getGameConfig)
  return (
    <div className='round-result'>
      <div className='round-result__left'>
        {isGameEnd ? <GameResultMap /> : <RoundResultsMap />}
      </div>
      <div className='round-result__right'>
        <RoundResultsHeader />
        {isGameEnd ? <GameResultGuesses /> : <RoundResultsGuesses />}
        <RoundResultsFooter />
      </div>
    </div>
  )
}

export default Result
