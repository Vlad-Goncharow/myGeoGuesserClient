import React from 'react'

import s from './PoinpointingResults.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'
import classNames from 'classnames'
import useDistance from '@/hooks/useDistance'
import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import {
  getGameState,
  getPoinpointingMode,
} from '@/redux/slices/Game/selectors/gameSelectors'

function PoinpointingResults() {
  const { players, targetCoordinates } = useAppSelector(getGameState)
  const { roundPlayersGuesses } = useAppSelector(getPoinpointingMode)
  const { haversineDistance } = useDistance()

  const results = React.useMemo(() => {
    if (!targetCoordinates || !players) return []

    const guessesMap = new Map(
      roundPlayersGuesses?.map((guess) => [guess.userId, guess.coordinates]) ||
        []
    )

    if (targetCoordinates && roundPlayersGuesses) {
      return players
        .map((player) => {
          const guessCoordinates = guessesMap.get(player.id)
          const distance = guessCoordinates
            ? haversineDistance(targetCoordinates, guessCoordinates).toFixed(2)
            : null
          return {
            user: player,
            distance,
          }
        })
        .sort((a, b) => Number(a.distance) - Number(b.distance))
    }
  }, [targetCoordinates, players, roundPlayersGuesses, haversineDistance])

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
              <span>{user.distance ? `${user.distance} km` : 'No guess'}</span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default PoinpointingResults
