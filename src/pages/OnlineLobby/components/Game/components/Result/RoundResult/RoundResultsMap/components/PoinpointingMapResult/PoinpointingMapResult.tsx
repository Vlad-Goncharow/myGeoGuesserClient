import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import MapComponent from '../../../../MapComponent'

function PoinpointingMapResult() {
  const {
    targetCoordinates,
    roundPlayersGuesses,
    players,
    roundsTargets,
    playersGuesses,
  } = useAppSelector(getGameConfig)

  const markers = React.useMemo(() => {
    if (targetCoordinates) {
      return [
        {
          position: targetCoordinates,
          title: 'Target Location',
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        },
        ...(roundPlayersGuesses?.map((guess) => ({
          position: guess.coordinates,
          title: `User: ${players.find((el) => el.id === guess.userId)?.nickname}`,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        })) || []),
      ]
    }
  }, [roundsTargets, playersGuesses, targetCoordinates])

  const lines = React.useMemo(() => {
    if (targetCoordinates) {
      return roundPlayersGuesses.map((guess) => ({
        start: guess.coordinates,
        end: targetCoordinates,
      }))
    }
  }, [roundPlayersGuesses, targetCoordinates])

  return (
    <>
      {targetCoordinates && (
        <MapComponent
          center={targetCoordinates}
          markers={markers}
          lines={lines}
        />
      )}
    </>
  )
}

export default PoinpointingMapResult
