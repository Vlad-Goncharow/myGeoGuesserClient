import React from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import s from './RoundResultsHeader.module.scss'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'

function RoundResultsHeader() {
  const { roundsPlayed } = useAppSelector(getGameState)
  const { settings } = useAppSelector(getGameConfig)
  return (
    <div className={s.title}>
      <span>round</span>
      <span>
        {roundsPlayed} / {settings.rounds}{' '}
      </span>
    </div>
  )
}

export default RoundResultsHeader
