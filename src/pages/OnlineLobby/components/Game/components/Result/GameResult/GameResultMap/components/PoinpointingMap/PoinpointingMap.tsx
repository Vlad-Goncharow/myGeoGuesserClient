import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import MapComponent from '../../../../MapComponent'

function PoinpointingMapResult() {
  const { roundsTargets, playersGuesses, players } =
    useAppSelector(getGameConfig)

  const markers = React.useMemo(() => {
    return [
      ...(roundsTargets?.map((target) => ({
        position: target.coordinates,
        title: `Round ${target.round}`,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      })) || []),
      ...(playersGuesses?.map((guess) => ({
        position: guess.coordinates,
        title: `User: ${players.find((el) => el.id === guess.userId)?.nickname}`,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      })) || []),
    ]
  }, [roundsTargets, playersGuesses])

  const lines = React.useMemo(() => {
    return playersGuesses
      .map((guess) => {
        const target = roundsTargets?.find((t) => t.round === guess.round)
        return target
          ? {
              start: guess.coordinates,
              end: target.coordinates,
            }
          : null
      })
      .filter(Boolean) as Array<{
      start: google.maps.LatLngLiteral
      end: google.maps.LatLngLiteral
    }>
  }, [playersGuesses, roundsTargets])

  return <MapComponent markers={markers} lines={lines} />
}

export default PoinpointingMapResult
