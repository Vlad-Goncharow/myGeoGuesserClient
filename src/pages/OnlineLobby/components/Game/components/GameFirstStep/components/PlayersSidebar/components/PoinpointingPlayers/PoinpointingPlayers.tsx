import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import s from './PoinpointingPlayers.module.scss'

function PoinpointingPlayers() {
  const { players, finishedGuessPlayersIds } = useAppSelector(getGameConfig)

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
