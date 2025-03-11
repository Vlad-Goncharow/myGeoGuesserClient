import {
  getGameConfig,
  isGameModeCountries,
} from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import { useAppSelector } from './useAppSelector'
import { countryPlayerGuessesType } from '@/redux/slices/Game/types/CountryModeTypes/CountryModeTypes'
import { coordinatesType } from '@/types/coordinates'
import { toast } from 'react-toastify'

function useRandomCords() {
  const [isPanoActive, setIsPanoActive] = React.useState<boolean>(false)
  const [randomLocation, setRandomLocation] =
    React.useState<coordinatesType | null>(null)

  const { countriesSettings } = useAppSelector(getGameConfig)
  const isModeCountries = useAppSelector(isGameModeCountries)
  const [targetCountry, setTargetCountry] =
    React.useState<countryPlayerGuessesType>()

  const [targetCords, setTargetCords] = React.useState<coordinatesType>()

  const getRandomCoordinates = () => {
    const keys = Object.keys(countriesSettings.countries)
    const randomCountryIndex = Math.floor(Math.random() * keys.length)
    const randomCountry = countriesSettings.countries[keys[randomCountryIndex]]
    const countryBounds = randomCountry.bounds

    const [minLon, minLat, maxLon, maxLat] = countryBounds
    const lat = Math.random() * (maxLat - minLat) + minLat
    const lng = Math.random() * (maxLon - minLon) + minLon

    return { lat, lng }
  }

  const checkIsPanoActive = (location: coordinatesType) => {
    return new Promise((resolve) => {
      const streetViewService = new window.google.maps.StreetViewService()

      streetViewService.getPanorama(
        {
          location: { lat: location.lat, lng: location.lng },
          radius: 10000,
          sources: [window.google.maps.StreetViewSource.GOOGLE],
        },
        async (result, status) => {
          if (status === 'OK' && result?.location?.latLng) {
            const lat = result.location.latLng.lat()
            const lng = result.location.latLng.lng()

            if (
              typeof lat !== 'number' ||
              isNaN(lat) ||
              typeof lng !== 'number' ||
              isNaN(lng)
            ) {
              console.warn('Invalid panorama coordinates:', { lat, lng })
              getNewLocation()
              resolve(false)
              return
            }

            const panoramaLocation = { lat, lng }
            const data = await getCountryByLocation(panoramaLocation)
            if (data !== null && data.code && data.name) {
              setIsPanoActive(true)
              setTargetCords(panoramaLocation)
              if (isModeCountries) {
                setTargetCountry({
                  country: data.name,
                  code: data.code,
                })
              }
              resolve(true)
            } else {
              console.warn('Country not found...')
              getNewLocation()
              resolve(false)
            }
          } else {
            console.warn('Dont have pano, find new one...')
            getNewLocation()
            resolve(false)
          }
        }
      )
    })
  }

  const getCountryByLocation = async (location: coordinatesType) => {
    const geocoder = new window.google.maps.Geocoder()
    const data = await geocoder.geocode({
      location: { lat: location.lat, lng: location.lng },
      language: 'en',
    })

    const geoCodeCountryName =
      data.results[data.results.length - 1]?.formatted_address || ''
    const code =
      data.results[data.results.length - 1].address_components[0].short_name

    const country = Object.values(countriesSettings.countries).find(
      (c) => c.name === geoCodeCountryName
    )
    if (country) {
      return {
        name: geoCodeCountryName,
        code,
      }
    }

    return null
  }

  const checkStreetViewAvailability = async (location: coordinatesType) => {
    try {
      await checkIsPanoActive(location)
    } catch (e) {
      console.error(e)
      toast.error('GetPano Error', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  const getNewLocation = () => {
    const newRandomLocation = getRandomCoordinates()
    setRandomLocation(newRandomLocation)
    checkStreetViewAvailability(newRandomLocation)
  }

  return {
    randomLocation,
    isPanoActive,
    setRandomLocation,
    checkStreetViewAvailability,
    getRandomCoordinates: getRandomCoordinates(),
    targetCords,
    targetCountry,
  }
}

export default useRandomCords
