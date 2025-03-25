import { GAMEMODS } from '@/config/constants'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import CountryModeControls from './components/CountryModeControls/CountryModeControls'
import s from './Controls.module.scss'
import { PinpointingModeControls } from './components/PinpointingModeControls/PinpointingModeControls'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'

function Controls() {
  const { settings } = useAppSelector(getGameConfig)
  const {roundTimeElapsed} = useAppSelector(getGameState)

  const returnByMode = () => {
    switch (settings.gameMode) {
      case GAMEMODS.PINPOINTING:
        return <PinpointingModeControls />
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
          {roundTimeElapsed} / {settings.roundTime}
        </span>
      </div>
    </div>
  )
}

export default Controls
