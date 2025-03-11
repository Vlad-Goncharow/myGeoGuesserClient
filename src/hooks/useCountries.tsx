import { Continent, continents } from '@/config/continents'
import { countries, CountryData } from '@/config/countries_bounds'
import React from 'react'

function useCountries() {
  const [selectedCountries, setSelectedCountries] = React.useState(countries)
  const [selectedContinents, setSelectedContinents] = React.useState(continents)

  const toggleCountry = (code: string, country: CountryData) => {
    if (findCountry(code)) {
      setSelectedCountries((prev) => {
        const newCountries = { ...prev }
        delete newCountries[code]
        return newCountries
      })
    } else {
      setSelectedCountries((prev) => {
        const newCountries = { ...prev }
        newCountries[code] = country
        return newCountries
      })
    }
  }

  const toggleContinent = (continent: Continent) => {
    if (findContinent(continent)) {
      setSelectedContinents((prev) => prev.filter((el) => el !== continent))

      setSelectedCountries((prev) => {
        const newCountries = { ...prev }
        const countryCodes = Object.keys(newCountries)

        countryCodes.forEach((code: string) => {
          if (newCountries[code].continent === continent) {
            delete newCountries[code]
          }
        })

        return newCountries
      })
    } else {
      setSelectedContinents((prev) => [...prev, continent])

      Object.entries(countries).forEach(([countryCode, countryData]) => {
        if (countryData.continent === continent) {
          setSelectedCountries((prev) => {
            const newCountries = { ...prev }
            newCountries[countryCode] = countryData
            return newCountries
          })
        }
      })
    }
  }

  const findCountry = (code: string) => {
    const find = selectedCountries[code]

    if (find) {
      return true
    } else {
      return false
    }
  }

  const findContinent = (continent: Continent) => {
    const checkContinents = selectedContinents.includes(continent)
    const checkCountriesByContinent = Object.values(selectedCountries).some(
      (country) => country.continent === continent
    )

    if (checkContinents || checkCountriesByContinent) {
      return true
    } else {
      return false
    }
  }

  return {
    toggleCountry,
    findCountry,
    selectedCountries,
    findContinent,
    toggleContinent,
    selectedContinents,
  }
}

export default useCountries
