import { GAMEMODS } from '@/config/constants'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import CountryModeControls from './components/CountryModeControls/CountryModeControls'
import PoinpointingModeControls from './components/PoinpointingModeControls/PoinpointingModeControls'
import s from './Controls.module.scss'
import useGameTime from '@/hooks/useGameTime'

function Controls() {
  const { settings } = useAppSelector(getGameConfig)
  const { timeElapsed } = useGameTime()

  const returnByMode = () => {
    switch (settings.gameMode) {
      case GAMEMODS.POINPOINTING:
        return <PoinpointingModeControls />
      case GAMEMODS.COUNTRYGUESSR:
        return <CountryModeControls />
    }
  }

  return (
    <div className={s.wrapper}>
      {returnByMode()}
      <div className={s.timer}>
        <span>time</span>
        <span>
          {timeElapsed} / {settings.roundTime}
        </span>
      </div>
    </div>
  )
}

export default Controls
