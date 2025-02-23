import countries50m from '@/config/countries50.json'
import {
  countryModePlayersGuessesType,
  targetCountriesType,
} from '@/redux/slices/GameConfig/types'
import React from 'react'

interface CountryMapResultProps {
  selectedCountries: countryModePlayersGuessesType[]
  targetCountry: targetCountriesType
}

const CountryMapResult: React.FC<CountryMapResultProps> = ({
  selectedCountries,
  targetCountry,
}) => {
  const mapRef = React.useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  React.useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        console.error('Google Maps JavaScript API not loaded')
        return
      }

      const mapInstance = new window.google.maps.Map(
        mapRef.current as HTMLDivElement,
        {
          center: { lat: 0, lng: 0 },
          zoom: 0.4,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          gestureHandling: 'greedy',
          draggableCursor: 'crosshair',
        }
      )

      setMap(mapInstance)
    }

    loadGoogleMaps()
  }, [])

  React.useEffect(() => {
    if (!map) return

    map.data.forEach((feature) => map.data.remove(feature))

    const countryCounts: Record<string, number> = {}

    const incorrectCountries = selectedCountries.filter(
      (selected) => selected.country !== targetCountry.country
    )

    incorrectCountries.forEach((selected) => {
      countryCounts[selected.country] =
        (countryCounts[selected.country] || 0) + 1
    })

    Object.keys(countryCounts).forEach((countryName) => {
      const findCountry = countries50m.features.find(
        (el) =>
          el.properties.NAME === countryName ||
          el.properties.NAME_LONG === countryName
      )

      if (findCountry) {
        const selectionCount = countryCounts[countryName]
        const baseOpacity = 0.6
        const fillOpacity = Math.min(
          1,
          baseOpacity + (selectionCount - 1) * 0.15
        )

        const feature = map.data.addGeoJson(findCountry)

        map.data.overrideStyle(feature[0], {
          fillColor: 'red',
          strokeColor: 'darkred',
          strokeWeight: 2,
          fillOpacity: fillOpacity,
        })
      }
    })

    const correctCountry = countries50m.features.find(
      (el) =>
        el.properties.NAME === targetCountry.country ||
        el.properties.NAME_LONG === targetCountry.country
    )

    if (correctCountry) {
      const feature = map.data.addGeoJson(correctCountry)

      map.data.overrideStyle(feature[0], {
        fillColor: '#24a522',
        strokeColor: 'darkgreen',
        strokeWeight: 2,
        fillOpacity: 0.9,
      })
    }
  }, [map, selectedCountries, targetCountry])

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
}

export default CountryMapResult
