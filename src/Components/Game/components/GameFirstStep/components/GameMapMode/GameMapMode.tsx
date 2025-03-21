import React from 'react'
import { PinpointingMap } from './components/PinpointingMap/PinpointingMap'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { GAMEMODS } from '@/config/constants'
import CountryMap from './components/CountryMap/CountryMap'

function GameMapMode() {
  const { settings } = useAppSelector(getGameConfig)

  switch (settings.gameMode) {
    case GAMEMODS.PINPOINTING:
      return <PinpointingMap />
    case GAMEMODS.COUNTRYGUESSR:
      return <CountryMap />
  }
}

export default GameMapMode
