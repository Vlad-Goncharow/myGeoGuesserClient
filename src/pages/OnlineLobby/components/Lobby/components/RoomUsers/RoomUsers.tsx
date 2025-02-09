import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import User from '../User/User'
import s from './RoomUsers.module.scss'

function RoomUsers() {
  const { players } = useAppSelector(getGameConfig)

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  return (
    <div ref={wrapperRef} className={s.users}>
      {players.map((userItem) => (
        <User userItem={userItem} key={userItem.id} />
      ))}
    </div>
  )
}

export default RoomUsers
