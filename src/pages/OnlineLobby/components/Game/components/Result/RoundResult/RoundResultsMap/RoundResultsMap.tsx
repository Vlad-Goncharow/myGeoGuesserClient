import React from 'react'
import PoinpointingMapResult from './components/PoinpointingMapResult/PoinpointingMapResult'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { useAppSelector } from '@/hooks/useAppSelector'
import { GAMEMODS } from '@/config/constants'
import CountryMapResult from '@/Components/CountryMapResult/CountryMapResult'
import CountryMap from './components/CountryMap/CountryMap'

function RoundResultsMap() {
  const { settings, countriesMode } = useAppSelector(getGameConfig)

  switch (settings.gameMode) {
    case GAMEMODS.POINPOINTING:
      return <PoinpointingMapResult />
    case GAMEMODS.COUNTRYGUESSR:
      return <CountryMap />
  }
}

export default RoundResultsMap
