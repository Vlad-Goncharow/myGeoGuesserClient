import { isGameModeCountries } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import { useAppSelector } from './useAppSelector'
import { countryPlayerGuessesType } from '@/redux/slices/Game/types/CountryModeTypes/CountryModeTypes'
import { coordinatesType } from '@/types/coordinates'

function useRandomCords() {
  const [isPanoActive, setIsPanoActive] = React.useState<boolean>(false)
  const [randomLocation, setRandomLocation] =
    React.useState<coordinatesType | null>(null)

  const getRandomCoordinates = (bounds: {
    north: number
    south: number
    east: number
    west: number
  }) => {
    const { north, south, east, west } = bounds
    const lat = Math.random() * (north - south) + south
    const lng = Math.random() * (east - west) + west
    return { lat, lng }
  }

  const europeBounds = {
    north: 70.0,
    south: 35.0,
    east: 40.0,
    west: -10.0,
  }

  const isModeCountries = useAppSelector(isGameModeCountries)
  const [targetCountry, setTargetCountry] =
    React.useState<countryPlayerGuessesType>()

  const [targetCords, setTargetCords] = React.useState<coordinatesType>()
  const checkStreetViewAvailability = (location: coordinatesType) => {
    const streetViewService = new window.google.maps.StreetViewService()

    streetViewService.getPanorama(
      { location, radius: 500, sources: [window.google.maps.StreetViewSource.GOOGLE]},
      async (result, status) => {
        if (status === 'OK') {
          if (result && result.location && result.location.latLng) {
            setIsPanoActive(true)
            const serializedCoordinates = {
              lat: result.location.latLng.lat(),
              lng: result.location.latLng.lng(),
            }

            if (isModeCountries) {
              const geocoder = new window.google.maps.Geocoder()
              const data = await geocoder.geocode({
                location: result.location.latLng,
                language: 'USA',
              })

              const geoCodeCountryName =
                data.results[data.results.length - 1].formatted_address
              setTargetCountry({
                country: geoCodeCountryName,
                code: data.results[data.results.length - 1]
                  .address_components[0].short_name,
              })
            }
            setTargetCords(serializedCoordinates)
          }
        } else {
          const newRandomLocation = getRandomCoordinates(europeBounds)
          setRandomLocation(newRandomLocation)
          checkStreetViewAvailability(newRandomLocation)
        }
      }
    )
  }

  return {
    randomLocation,
    isPanoActive,
    setRandomLocation,
    checkStreetViewAvailability,
    getRandomCoordinates: getRandomCoordinates(europeBounds),
    targetCords,
    targetCountry,
  }
}

export default useRandomCords
