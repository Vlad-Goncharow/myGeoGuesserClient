import AltPatch from '@/assets/img/alt_patch.jpg'
import { IncludeTempUser } from '@/types/users'
import classNames from 'classnames'
import React from 'react'

interface FullUserItemProps {
  user: IncludeTempUser
  className?: string
}

const FullUserItem: React.FC<FullUserItemProps> = ({ user, className }) => {
  return (
    <div className={classNames('full-user', className)}>
      <div className='full-user__patch'>
        {user.patch ? (
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/uploads${user.patch}`}
          />
        ) : (
          <img src={AltPatch} />
        )}
      </div>
      {user.avatar ? (
        user.avatar.includes('/avatars/') ? (
          <div className={'full-user__avatar'}>
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/uploads${user?.avatar}`}
              alt={`user-${user.nickname} avatar`}
            />
          </div>
        ) : (
          <div className={'full-user__avatar'}>
            <img src={user.avatar} alt={`user-${user.nickname} avatar`} />
          </div>
        )
      ) : null}
      <div className={'full-user__name'}>{user.nickname}</div>
    </div>
  )
}

export default FullUserItem
