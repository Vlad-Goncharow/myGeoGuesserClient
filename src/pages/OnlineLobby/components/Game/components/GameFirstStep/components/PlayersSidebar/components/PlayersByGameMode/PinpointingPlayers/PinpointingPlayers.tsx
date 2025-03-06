import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppSelector } from '@/hooks/useAppSelector'
import classNames from 'classnames'
import React from 'react'
import s from './PinpointingPlayers.module.scss'
import {
  getGameState,
  getPinpointingMode,
} from '@/redux/slices/Game/selectors/gameSelectors'

export function PinpointingPlayers() {
  const { players } = useAppSelector(getGameState)
  const { finishedGuessPlayersIds } = useAppSelector(getPinpointingMode)

  return (
    <div className={s.wrapper}>
      {players.map((user) => (
        <div key={user.id} className={s.user}>
          {user && <FullUserItem user={user} />}
          <span
            className={classNames(s.user__finish, {
              [s.user__finish_ok]: finishedGuessPlayersIds.find(
                (el) => el === user.id
              ),
            })}
          ></span>
        </div>
      ))}
    </div>
  )
}
