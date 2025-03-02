import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppSelector } from '@/hooks/useAppSelector'
import useDistance from '@/hooks/useDistance'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import s from './Poinpointing.module.scss'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import { IncludeTempUser } from '@/types/users'

interface Result {
  user: IncludeTempUser
  distance: number
}

function PoinpointingResults() {
  const { players } = useAppSelector(getGameState)
  const { roundsTargets, playersGuesses } = useAppSelector(getGameConfig)
  const { haversineDistance } = useDistance()

  const results = React.useMemo(() => {
    if (!playersGuesses || !roundsTargets || !players) return []

    return playersGuesses
      .map((guess) => {
        const roundTarget = roundsTargets.find(
          (target) => target.round === guess.round
        )
        const user = (players as IncludeTempUser[]).find(
          (player) => player.id === guess.userId
        )

        if (roundTarget && user) {
          const distance = haversineDistance(
            roundTarget.coordinates,
            guess.coordinates
          )
          return {
            user,
            distance: Number(distance.toFixed(2)),
          }
        }
        return undefined
      })
      .filter((item): item is Result => Boolean(item))
      .reduce((acc: Result[], cur: Result) => {
        const existingUser = acc.find((user) => user.user.id === cur.user.id)

        if (existingUser) {
          existingUser.distance = Number(
            (existingUser.distance + cur.distance).toFixed(2)
          )
        } else {
          acc.push({
            user: cur.user,
            distance: Number(cur.distance),
          })
        }

        return acc
      }, [])
      .sort((a, b) => Number(a.distance) - Number(b.distance))
  }, [haversineDistance, players, playersGuesses, roundsTargets])

  return (
    <div className={classNames(s.users)}>
      {results.map((user, index) => (
        <div
          key={user.user?.id || index}
          className={classNames(s.users__user, s.user)}
        >
          {user.user && <FullUserItem user={user.user} />}
          <div className={s.stats}>
            <span>{user.distance} km</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PoinpointingResults
