import CountryMapResult from '@/Components/CountryMapResult/CountryMapResult'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGame } from '@/redux/slices/Game/selectors/gameSelectors'
import React from 'react'

function CountryMap() {
  const { countryMode } = useAppSelector(getGame)

  if (!countryMode.global.targetCountry) {
    return null
  }

  return (
    <CountryMapResult
      selectedCountries={countryMode.global.selectedCountries}
      targetCountry={countryMode.global.targetCountry}
    />
  )
}

export default CountryMap
