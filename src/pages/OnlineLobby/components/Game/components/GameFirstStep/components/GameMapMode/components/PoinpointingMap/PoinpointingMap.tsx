import React from 'react'
import s from './PoinpointingMap.module.scss'
import classNames from 'classnames'
import { faMountainSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gameConfigActions } from '@/redux/slices/GameConfig/slice/GameConfigSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { useAppSelector } from '@/hooks/useAppSelector'

function PoinpointingMap() {
  const { targetCoordinates } = useAppSelector(getGameConfig)

  const dispatch = useAppDispatch()

  const streetViewRef = React.useRef<HTMLDivElement>(null)
  const mapRef = React.useRef<HTMLDivElement>(null)

  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  const [marker, setMarker] = React.useState<google.maps.Marker | null>(null)

  React.useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        console.error('Google Maps JavaScript API not loaded')
        return
      }

      new window.google.maps.StreetViewPanorama(
        streetViewRef.current as HTMLDivElement,
        {
          position: targetCoordinates,
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
          disableDefaultUI: true,
        }
      )
    }

    loadGoogleMaps()
  }, [targetCoordinates])

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return

    const clickedLatLng = event.latLng
    const coordinates = {
      lat: clickedLatLng.lat(),
      lng: clickedLatLng.lng(),
    }

    // Update or create the marker
    if (marker) {
      marker.setPosition(coordinates)
    } else {
      const newMarker = new window.google.maps.Marker({
        position: coordinates,
        map: map!,
      })
      setMarker(newMarker)
    }

    dispatch(gameConfigActions.setPlayerCoordinatesGuess(coordinates))
  }

  React.useEffect(() => {
    if (map) {
      map.addListener('click', handleMapClick)
    }

    return () => {
      if (map) {
        google.maps.event.clearListeners(map, 'click')
      }
    }
  }, [map, marker])

  React.useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        console.error('Google Maps JavaScript API not loaded')
        return
      }

      const mapInstance = new window.google.maps.Map(
        mapRef.current as HTMLDivElement,
        {
          center: targetCoordinates,
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
  }, [targetCoordinates])

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom()! + 1)
    }
  }

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom()! - 1)
    }
  }

  const handleSwitchMapType = () => {
    if (map) {
      const currentMapType = map.getMapTypeId()
      map.setMapTypeId(currentMapType === 'roadmap' ? 'terrain' : 'roadmap')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Mini Map Container */}
      <div ref={streetViewRef} className={s.panorama}></div>

      <div className={s.minimap}>
        <div ref={mapRef} className={s.minimap__map}></div>
        <div className={classNames(s.minimap__controls, s.miniControls)}>
          <button onClick={handleSwitchMapType} className={s.miniControls__btn}>
            <FontAwesomeIcon icon={faMountainSun} />
          </button>
          <div className={s.miniControls__zoom}>
            <div
              onClick={handleZoomOut}
              className={classNames(s.miniControls__zoomItem)}
            >
              -
            </div>
            <div
              onClick={handleZoomIn}
              className={classNames(s.miniControls__zoomItem)}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoinpointingMap
