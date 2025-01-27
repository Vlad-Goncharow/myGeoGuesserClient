import React from 'react'

import s from './PoinpointingResults.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import useDistance from '@/hooks/useDistance'
import FullUserItem from '@/Components/FullUserItem/FullUserItem'

function PoinpointingResults() {
  const { targetCoordinates, roundPlayersGuesses, players } =
    useAppSelector(getGameConfig)
  const { haversineDistance } = useDistance()

  const results = React.useMemo(() => {
    if (targetCoordinates && roundPlayersGuesses) {
      return roundPlayersGuesses
        .map((guess) => {
          const distance = haversineDistance(
            targetCoordinates,
            guess.coordinates
          )
          const user = players.find((player) => player.id === guess.userId)
          return {
            user: user,
            distance: distance.toFixed(2),
          }
        })
        .sort((a, b) => Number(a.distance) - Number(b.distance))
    }
  }, [targetCoordinates])

  return (
    <div className={classNames(s.users)}>
      {results &&
        results.map((user, index) => (
          <div
            key={`index${index}user${user.user?.id}`}
            className={classNames(s.users__user, s.user)}
          >
            {user.user && <FullUserItem user={user.user} />}
            <div className={s.stats}>
              <span>{user.distance} km</span>
              <span>12 s</span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default PoinpointingResults
