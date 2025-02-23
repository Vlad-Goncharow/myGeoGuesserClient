import { GAMEMODS } from '@/config/constants'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import PoinpointingPlayers from './PoinpointingPlayers/PoinpointingPlayers'
import CountryPlayers from './CountryPlayers/CountryPlayers'

function PlayersByGameMode() {
  const { settings } = useAppSelector(getGameConfig)

  switch (settings.gameMode) {
    case GAMEMODS.POINPOINTING:
      return <PoinpointingPlayers />
    case GAMEMODS.COUNTRYGUESSR:
      return <CountryPlayers />
  }
}

export default PlayersByGameMode
