import CountryMapResult from '@/Components/CountryMapResult/CountryMapResult'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'

function CountryMap() {
  const { countriesMode } = useAppSelector(getGameConfig)

  if (!countriesMode.global.targetCountry) {
    return null
  }

  return (
    <CountryMapResult
      selectedCountries={countriesMode.global.selectedCountries}
      targetCountry={countriesMode.global.targetCountry}
    />
  )
}

export default CountryMap
