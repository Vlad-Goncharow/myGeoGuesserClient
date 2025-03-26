import { useAppSelector } from '@/hooks/useAppSelector'
import React from 'react'
import User from '../User/User'
import s from './RoomUsers.module.scss'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'

function RoomUsers() {
  const { players } = useAppSelector(getGameState)
  const { settings } = useAppSelector(getGameConfig)

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h1 className={s.title}>Players</h1>
        <div className={s.size}>
          {players.length} | {settings.maxPlayers}
        </div>
      </div>
      <div ref={wrapperRef} className={s.users}>
        {players.map((userItem) => (
          <User userItem={userItem} key={userItem.id} />
        ))}
      </div>
    </div>
  )
}

export default RoomUsers
