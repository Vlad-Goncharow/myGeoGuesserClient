import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import {
  checkIsPinpointingHard,
  checkIsPinpointingMedium,
} from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { faMountainSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React from 'react'
import s from './PinpointingMap.module.scss'
import { gameActions } from '@/redux/slices/Game/slice/GameSlice'

export function PinpointingMap() {
  const { targetCoordinates } = useAppSelector(getGameState)

  const isMediumtDiff = useAppSelector(checkIsPinpointingMedium)
  const isHardtDiff = useAppSelector(checkIsPinpointingHard)

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
          clickToGo: isMediumtDiff || isHardtDiff ? false : true,
          scrollwheel: isHardtDiff ? false : true,
          showRoadLabels: false,
        }
      )
    }

    loadGoogleMaps()
  }, [isHardtDiff, isMediumtDiff, targetCoordinates])

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

    dispatch(gameActions.setPlayerCoordinatesGuess(coordinates))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      if (isHardtDiff) {
        mapInstance.setOptions({
          styles: [
            {
              elementType: 'labels',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'administrative',
              elementType: 'geometry',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'administrative.land_parcel',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'administrative.neighborhood',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'poi',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'transit',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
          ],
        })
      }
      setMap(mapInstance)
    }

    loadGoogleMaps()
  }, [isHardtDiff, targetCoordinates])

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
