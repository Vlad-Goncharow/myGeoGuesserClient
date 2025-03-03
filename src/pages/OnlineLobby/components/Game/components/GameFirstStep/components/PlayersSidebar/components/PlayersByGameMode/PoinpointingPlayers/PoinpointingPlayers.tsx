import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppSelector } from '@/hooks/useAppSelector'
import classNames from 'classnames'
import React from 'react'
import s from './PoinpointingPlayers.module.scss'
import {
  getGameState,
  getPoinpointingMode,
} from '@/redux/slices/Game/selectors/gameSelectors'

function PoinpointingPlayers() {
  const { players } = useAppSelector(getGameState)
  const { finishedGuessPlayersIds } = useAppSelector(getPoinpointingMode)

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

export default PoinpointingPlayers
