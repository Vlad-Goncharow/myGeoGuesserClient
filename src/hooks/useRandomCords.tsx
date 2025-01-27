import { coordinatesType } from '@/redux/slices/GameConfig/types'
import React from 'react'

function useRandomCords() {
  const [isPanoActive, setIsPanoActive] = React.useState<boolean>(false)
  const [randomLocation, setRandomLocation] = React.useState<any>(null)

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

  const [targetCords, setTargetCords] = React.useState<{
    lat: number
    lng: number
  }>()
  const checkStreetViewAvailability = (location: coordinatesType) => {
    const streetViewService = new window.google.maps.StreetViewService()

    streetViewService.getPanorama(
      { location, radius: 500 },
      (result, status) => {
        if (status === 'OK') {
          if (result && result.location && result.location.latLng) {
            setIsPanoActive(true)
            const serializedCoordinates = {
              lat: result.location.latLng.lat(),
              lng: result.location.latLng.lng(),
            }

            setTargetCords(serializedCoordinates)
          }
        } else {
          setIsPanoActive(false)
          setRandomLocation(getRandomCoordinates(europeBounds))
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
  }
}

export default useRandomCords
