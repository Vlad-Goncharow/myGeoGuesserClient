import React from 'react'
import s from './Players.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'
import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { getGame } from '@/redux/slices/Game/selectors/gameSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'

function Players() {
  const { gameState } = useAppSelector(getGame)
  const { settings } = useAppSelector(getGameConfig)

  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        Joined Players -{' '}
        <span>
          {gameState.players.length}|{settings.maxPlayers}
        </span>
      </div>
      <div className={s.list}>
        {gameState.players.map((player) => (
          <div key={player.id} className={s.list__user}>
            <FullUserItem user={player} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Players
