import React from 'react'
import { PinpointingMap } from './components/PinpointingMap/PinpointingMap'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { useAppSelector } from '@/hooks/useAppSelector'
import { GAMEMODS } from '@/config/constants'
import GameResultCountryMap from './components/GameResultCountryMap/GameResultCountryMap'

function GameResultMap() {
  const { settings } = useAppSelector(getGameConfig)

  switch (settings.gameMode) {
    case GAMEMODS.PINPOINTING:
      return <PinpointingMap />
    case GAMEMODS.COUNTRYGUESSR:
      return <GameResultCountryMap />
  }
}

export default GameResultMap
