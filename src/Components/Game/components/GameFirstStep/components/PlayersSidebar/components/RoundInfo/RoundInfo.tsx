import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import s from './RoundInfo.module.scss'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'

function RoundInfo() {
  const { roundsPlayed } = useAppSelector(getGameState)
  const { settings } = useAppSelector(getGameConfig)

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__item}>
        <div className={s.wrapper__title}>map</div>
        <div className={s.wrapper__info}>All around world</div>
      </div>
      <div className={s.wrapper__item}>
        <div className={s.wrapper__title}>ROUND</div>
        <div className={s.wrapper__info}>
          {roundsPlayed + 1} / {settings.rounds}
        </div>
      </div>
    </div>
  )
}

export default RoundInfo
