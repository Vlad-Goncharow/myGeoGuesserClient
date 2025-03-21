import { getLine } from '@/utils/mapLine'
import React from 'react'

interface MapComponentProps {
  center?: google.maps.LatLngLiteral
  zoom?: number
  markers?: Array<{
    position: google.maps.LatLngLiteral
    title: string
    icon: string
  }>
  lines?: Array<{
    start: google.maps.LatLngLiteral
    end: google.maps.LatLngLiteral
  }>
}

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom = 5,
  markers = [],
  lines = [],
}) => {
  const mapRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!window.google || !mapRef.current) {
      console.error('Google Maps JavaScript API not loaded or mapRef is null.')
      return
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      gestureHandling: 'greedy',
      draggableCursor: 'crosshair',
    })

    const bounds = new window.google.maps.LatLngBounds()

    markers.forEach((marker) => {
      new window.google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title,
        icon: {
          url: marker.icon,
        },
      })

      bounds.extend(marker.position)
    })

    lines.forEach((line) => {
      const lineInstance = getLine([line.start, line.end])
      lineInstance.setMap(map)
    })

    if (markers.length > 0 || lines.length > 0) {
      map.fitBounds(bounds)
    }
  }, [center, zoom, markers, lines])

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
}

export default MapComponent
