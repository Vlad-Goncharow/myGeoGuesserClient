import React from 'react'
import { PinpointingResults } from './components/PinpointingResults/PinpointingResults'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { useAppSelector } from '@/hooks/useAppSelector'
import { GAMEMODS } from '@/config/constants'
import CountryModeResult from './components/CountryModeResult/CountryModeResult'

function RoundResultsGuesses() {
  const { settings } = useAppSelector(getGameConfig)

  switch (settings.gameMode) {
    case GAMEMODS.PINPOINTING:
      return <PinpointingResults />
    case GAMEMODS.COUNTRYGUESSR:
      return <CountryModeResult />
  }
}

export default RoundResultsGuesses
