import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppSelector } from '@/hooks/useAppSelector'
import useDistance from '@/hooks/useDistance'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import s from './Poinpointing.module.scss'

function PoinpointingResults() {
  const { roundsTargets, playersGuesses, players } =
    useAppSelector(getGameConfig)
  const { haversineDistance } = useDistance()

  const results = React.useMemo(() => {
    if (!playersGuesses || !roundsTargets || !players) return []

    return playersGuesses
      .map((guess) => {
        const roundTarget = roundsTargets.find(
          (target) => target.round === guess.round
        )
        const user = players.find((player) => player.id === guess.userId)

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
      .filter(Boolean)
      .reduce((acc: any[], cur: any) => {
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
  }, [playersGuesses, roundsTargets])

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
            <span>12 s</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PoinpointingResults
