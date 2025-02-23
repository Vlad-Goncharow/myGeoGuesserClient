import React from 'react'
import Poinpointing from './components/Poinpointing/Poinpointing'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { useAppSelector } from '@/hooks/useAppSelector'
import { GAMEMODS } from '@/config/constants'
import CountryModeGameRes from './components/CountryModeGameRes/CountryModeGameRes'

function GameResultGuesses() {
  const { settings } = useAppSelector(getGameConfig)

  switch (settings.gameMode) {
    case GAMEMODS.POINPOINTING:
      return <Poinpointing />
    case GAMEMODS.COUNTRYGUESSR:
      return <CountryModeGameRes />
  }
}

export default GameResultGuesses
