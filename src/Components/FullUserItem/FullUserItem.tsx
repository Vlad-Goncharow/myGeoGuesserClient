import { IUser } from '@/redux/slices/AuthSlice/types'
import classNames from 'classnames'
import React from 'react'

interface FullUserItemProps {
  user: IUser
  className?: string
}

const FullUserItem: React.FC<FullUserItemProps> = ({ user, className }) => {
  return (
    <div className={classNames('full-user', className)}>
      <div className={'full-user__avatar'}>
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/uploads/avatars/${user?.avatar}`}
          alt={`user-${user.nickname} avatar`}
        />
      </div>
      <div className={'full-user__name'}>{user.nickname}</div>
    </div>
  )
}

export default FullUserItem
