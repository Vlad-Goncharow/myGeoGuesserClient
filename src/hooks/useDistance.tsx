import React from 'react'

function useDistance() {
  function haversineDistance(
    coord1: { lat: number; lng: number },
    coord2: { lat: number; lng: number }
  ) {
    const R = 6371
    const toRad = (angle: number) => (angle * Math.PI) / 180

    const dLat = toRad(coord2.lat - coord1.lat)
    const dLng = toRad(coord2.lng - coord1.lng)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coord1.lat)) *
        Math.cos(toRad(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  return { haversineDistance }
}

export default useDistance
