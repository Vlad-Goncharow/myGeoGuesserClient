import CountryMapResult from '@/Components/CountryMapResult/CountryMapResult'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
  getGame,
  getGameState,
} from '@/redux/slices/Game/selectors/gameSelectors'
import React from 'react'

function GameResultCountryMap() {
  const { roundsPlayed } = useAppSelector(getGameState)
  const { countryMode } = useAppSelector(getGame)

  const selectedCountries = React.useMemo(() => {
    if (countryMode.local.tempSelectedCountries !== null) {
      return countryMode.local.tempSelectedCountries
    } else {
      return countryMode.global.selectedCountries.filter(
        (el) => el.round === roundsPlayed
      )
    }
  }, [
    countryMode.global.selectedCountries,
    countryMode.local.tempSelectedCountries,
    roundsPlayed,
  ])

  const targetCountry = React.useMemo(() => {
    if (countryMode.local.tempTargetCountry !== null) {
      return countryMode.local.tempTargetCountry
    } else {
      return countryMode.global.targetCountry
    }
  }, [countryMode])

  return (
    <CountryMapResult
      selectedCountries={selectedCountries}
      targetCountry={targetCountry}
    />
  )
}

export default GameResultCountryMap
