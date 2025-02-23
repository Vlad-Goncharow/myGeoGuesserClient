import React from 'react'
import PoinpointingMap from './components/PoinpointingMap/PoinpointingMap'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { GAMEMODS } from '@/config/constants'
import CountryMap from './components/CountryMap/CountryMap'

function GameMapMode() {
  const { settings } = useAppSelector(getGameConfig)

  switch (settings.gameMode) {
    case GAMEMODS.POINPOINTING:
      return <PoinpointingMap />
    case GAMEMODS.COUNTRYGUESSR:
      return <CountryMap />
  }
}

export default GameMapMode
