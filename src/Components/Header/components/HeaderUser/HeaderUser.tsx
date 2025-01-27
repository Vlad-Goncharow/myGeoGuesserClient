import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { UseClickOutside } from '@/hooks/useCliclOutside'
import { fetchLogout } from '@/redux/slices/AuthSlice/thunks'
import { IUser } from '@/redux/slices/AuthSlice/types'
import {
  faCircleUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animated, easings, useSpring } from '@react-spring/web'
import React from 'react'
import s from './HeaderUser.module.scss'

interface HeaderUserProps {
  user: IUser
}

const HeaderUser: React.FC<HeaderUserProps> = ({ user }) => {
  const dispatch = useAppDispatch()

  const userRef = React.useRef<HTMLDivElement | null>(null)
  const [popupIsOpen, setPopupIsOpen] = React.useState<boolean>(false)

  const logout = async () => {
    try {
      dispatch(fetchLogout())
    } catch (e) {}
  }

  //animation init
  const { right } = useSpring({
    from: { right: '-200%' },
    right: popupIsOpen ? '0' : '-200%',
    duration: 300,
    easing: easings.easeInOutQuad,
  })

  UseClickOutside(userRef, () => setPopupIsOpen(false))

  const copyUserIdHandle = () => {
    navigator.clipboard.writeText(`${user?.id}`)
  }

  return (
    <div ref={userRef} className={s.user}>
      <div onClick={() => setPopupIsOpen((prev) => !prev)}>
        <FullUserItem user={user} />
      </div>

      {
        <animated.div
          className={s.popup}
          style={{
            right: right,
          }}
        >
          <div className={s.popup__header}>
            <FullUserItem user={user} />
          </div>
          <div className={s.popup__userid}>
            userId
            <span onClick={copyUserIdHandle}>{user?.id}</span>
          </div>
          <div className={s.popup__controlls}>
            <div className={s.popup__item}>
              <FontAwesomeIcon icon={faCircleUser} className={s.icon} />
              <span className={s.name}>Account</span>
            </div>
            <div onClick={logout} className={s.popup__item}>
              <FontAwesomeIcon icon={faRightFromBracket} className={s.icon} />
              <span className={s.name}>logout</span>
            </div>
          </div>
        </animated.div>
      }
    </div>
  )
}

export default HeaderUser
