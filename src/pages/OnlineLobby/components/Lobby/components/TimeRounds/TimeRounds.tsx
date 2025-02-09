import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { formatTime } from '@/utils/formatTime'
import React from 'react'
import s from './TimeRounds.module.scss'

function TimeRounds() {
  const { settings } = useAppSelector(getGameConfig)

  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <div className={s.info__label}>Rounds | Time</div>
        <div className={s.info__value}>
          <p>
            {settings.rounds} <span>ROUNDS</span>
          </p>
          <p>
            {formatTime(settings.roundTime)} <span>BY ROUND</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TimeRounds
