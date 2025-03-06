import { GAMEMODS } from '@/config/constants'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import CountryMap from './components/CountryMap/CountryMap'
import { PinpointingMapResult } from './components/PinpointingMapResult/PinpointingMapResult'

function RoundResultsMap() {
  const { settings } = useAppSelector(getGameConfig)

  switch (settings.gameMode) {
    case GAMEMODS.PINPOINTING:
      return <PinpointingMapResult />
    case GAMEMODS.COUNTRYGUESSR:
      return <CountryMap />
  }
}

export default RoundResultsMap
