import React from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'

function RoundResultsHeader() {
  const { roundsPlayed, rounds } = useAppSelector(getGameConfig)
  return (
    <div className='round-result__header'>
      <span>round</span>
      <span>
        {roundsPlayed} / {rounds}{' '}
      </span>
    </div>
  )
}

export default RoundResultsHeader
