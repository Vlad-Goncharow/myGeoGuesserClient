import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import User from './User'

function RoomUsers() {
  const { players } = useAppSelector(getGameConfig)

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  return (
    <div ref={wrapperRef} className='lobby__users room-users'>
      {players.map((userItem) => (
        <User userItem={userItem} key={userItem.id} />
      ))}
    </div>
  )
}

export default RoomUsers
