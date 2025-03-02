import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { UseClickOutside } from '../../../../hooks/UseClickOutside'
import { fetchLogout } from '@/redux/slices/AuthSlice/thunks'
import { IUser } from '@/redux/slices/AuthSlice/types'
import {
  faCircleUser,
  faGear,
  faKey,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animated, easings, useSpring } from '@react-spring/web'
import React from 'react'
import s from './HeaderUser.module.scss'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface HeaderUserProps {
  user: IUser
}

const HeaderUser: React.FC<HeaderUserProps> = ({ user }) => {
  const dispatch = useAppDispatch()

  const userRef = React.useRef<HTMLDivElement | null>(null)
  const [popupIsOpen, setPopupIsOpen] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const logout = async () => {
    try {
      dispatch(fetchLogout())
      navigate('/')
    } catch (e: unknown) {
      console.error(e)
      toast.error('Logout error', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
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

  const openApiModal = async () => {
    dispatch(modalsActions.toggleApiKeyModal())
    setPopupIsOpen(false)
  }

  const location = useLocation()
  React.useEffect(() => {
    setPopupIsOpen(false)
  }, [location])

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
            #<span onClick={copyUserIdHandle}>{user?.id}</span>
          </div>
          <div className={s.popup__controlls}>
            <Link to={`/user-page/${user.id}`} className={s.popup__item}>
              <FontAwesomeIcon icon={faCircleUser} className={s.icon} />
              <span className={s.name}>Account</span>
            </Link>
            <Link to={`/settings/profile`} className={s.popup__item}>
              <FontAwesomeIcon icon={faGear} className={s.icon} />
              <span className={s.name}>Settings</span>
            </Link>
            <div onClick={logout} className={s.popup__item}>
              <FontAwesomeIcon icon={faRightFromBracket} className={s.icon} />
              <span className={s.name}>logout</span>
            </div>
            <div onClick={openApiModal} className={s.popup__item}>
              <FontAwesomeIcon icon={faKey} className={s.icon} />
              <span className={s.name}>Your Google API KEY</span>
            </div>
          </div>
        </animated.div>
      }
    </div>
  )
}

export default HeaderUser
