import React from 'react'
import s from './HeaderUser.module.scss'
import { faCircleUser, faCopy, faRightFromBracket, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchLogout } from '@/redux/slices/AuthSlice/thunks'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { UseClickOutside } from '@/hooks/useCliclOutside'
import { animated, easings, useSpring } from '@react-spring/web'

function HeaderUser() {
  const {user} = useAppSelector(getAuth)
  const dispatch = useAppDispatch()

  const userRef = React.useRef<HTMLDivElement | null>(null)
  const [popupIsOpen, setPopupIsOpen] = React.useState<boolean>(false)

  const logout = async () => {
    try {
      dispatch(fetchLogout())
    } catch(e) {

    }
  }

  //animation init
  const [springs, api] = useSpring(() => ({
    config: {
      duration: 300,
      easing: easings.easeInOutQuad, 
    },
  }))

  //animation handle
  React.useEffect(() => {
    if(popupIsOpen){
      api.start({
        from: { x: '150%' },
        to: { x: '0%' },
      })
    } else {
      api.start({
        from: { x: '0' },
        to: { x: '150%' },
      })
    }
  },[popupIsOpen])

 
  UseClickOutside(userRef, () => setPopupIsOpen(false))

  const copyUserIdHandle = () => {
    navigator.clipboard.writeText(`${user?.id}`)
  }

  return (
    <div ref={userRef} className={s.user}>
      <div onClick={() => setPopupIsOpen(prev => !prev)} className={s.user__icon}>
        <img src={`${import.meta.env.VITE_SERVER_URL}/uploads/avatars/${user?.avatar}`} alt=""/>
      </div>

      {
        <animated.div
          className={s.popup}
          style={{
            ...springs,
          }}
        >
          <div className={s.popup__header}>
            <div onClick={() => setPopupIsOpen(prev => !prev)} className={s.user__icon}>
              <img src={`${import.meta.env.VITE_SERVER_URL}/uploads/avatars/${user?.avatar}`} alt=""/>
            </div>
            <div className={s.popup__nickname}>
              {user?.nickname}
            </div>
          </div>
          <div className={s.popup__userid}>
            userId 
            
            <span onClick={copyUserIdHandle}>
              <FontAwesomeIcon icon={faCopy} />
              {user?.id}
            </span>
          </div>
          <div className={s.popup__controlls}>
            <div className={s.popup__item}>
              <div className={s.icon}>
                <FontAwesomeIcon icon={faCircleUser} />
              </div>
              <span className={s.name}>Account</span>
            </div>
            <div onClick={logout} className={s.popup__item}>
              <div className={s.icon}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </div>
              <span className={s.name}>logout</span>
            </div>
          </div>
        </animated.div>        
      }
    </div>
  )
}

export default HeaderUser