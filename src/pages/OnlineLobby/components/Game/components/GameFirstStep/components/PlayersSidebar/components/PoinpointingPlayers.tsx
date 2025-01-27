import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'

function PoinpointingPlayers() {
  const { players, finishedGuessPlayersIds } = useAppSelector(getGameConfig)

  return (
    <div className='poinpointing-players'>
      {players.map((user) => (
        <div
          key={user.id}
          className={'poinpointing-players__player poinpointing-player'}
        >
          {user && <FullUserItem user={user} />}
          <span
            className={classNames('poinpointing-player__finish', {
              'poinpointing-player__finish_ok': finishedGuessPlayersIds.find(
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
