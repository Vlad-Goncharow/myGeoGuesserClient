import { useAppSelector } from '@/hooks/useAppSelector'
import React from 'react'
import User from '../User/User'
import s from './RoomUsers.module.scss'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'

function RoomUsers() {
  const { players } = useAppSelector(getGameState)

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
