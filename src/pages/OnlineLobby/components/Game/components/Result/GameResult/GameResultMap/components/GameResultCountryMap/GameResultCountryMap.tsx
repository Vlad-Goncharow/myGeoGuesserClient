import CountryMapResult from '@/Components/CountryMapResult/CountryMapResult'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'

function GameResultCountryMap() {
  const { countriesMode, roundsPlayed } = useAppSelector(getGameConfig)

  const selectedCountries = React.useMemo(() => {
    if (countriesMode.local.tempSelectedCountries !== null) {
      return countriesMode.local.tempSelectedCountries
    } else {
      return countriesMode.global.selectedCountries.filter(
        (el) => el.round === roundsPlayed
      )
    }
  }, [countriesMode])

  const targetCountry = React.useMemo(() => {
    if (countriesMode.local.tempTargetCountry !== null) {
      return countriesMode.local.tempTargetCountry
    } else {
      return countriesMode.global.targetCountry
    }
  }, [countriesMode])

  return (
    <CountryMapResult
      selectedCountries={selectedCountries}
      targetCountry={targetCountry}
    />
  )
}

export default GameResultCountryMap
