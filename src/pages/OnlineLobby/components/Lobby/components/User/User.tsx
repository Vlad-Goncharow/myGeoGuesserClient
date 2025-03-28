import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { UseClickOutside } from '../../../../../../hooks/UseClickOutside'
import { IUser } from '@/redux/slices/AuthSlice/types'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import s from './User.module.scss'

interface UserProps {
  userItem: IUser
}

const User: React.FC<UserProps> = ({ userItem }) => {
  const menuRef = React.useRef<HTMLDivElement | null>(null)

  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false)
  UseClickOutside(menuRef, () => setMenuIsOpen(false))

  return (
    <div className={s.user}>
      <FullUserItem user={userItem} />
      {!userItem.id.toString().includes('temp-') && (
        <>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={() => setMenuIsOpen(true)}
            className={s.user__menu}
          />
          {menuIsOpen && (
            <div ref={menuRef} className={s.user__profile}>
              <Link to={`/user-page/${userItem.id}`}>View profile</Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default User
