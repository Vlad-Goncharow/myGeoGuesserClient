import { Coordinates } from '@/types/webSocket'

export const getLine = (path: Coordinates[]) => {
  const lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 2,
    strokeColor: 'black',
  }
  const line = new window.google.maps.Polyline({
    path: path,
    geodesic: false,
    strokeColor: '#0000FF',
    strokeOpacity: 0,
    strokeWeight: 1,
    icons: [
      {
        icon: lineSymbol,
        offset: '0',
        repeat: '15px',
      },
    ],
  })

  return line
}
