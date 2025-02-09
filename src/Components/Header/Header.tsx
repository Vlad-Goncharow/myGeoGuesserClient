import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PlateBtn from '../PlateBtn/PlateBtn'
import HeaderUser from './components/HeaderUser/HeaderUser'
import s from './Header.module.scss'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'

function Header() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(getAuth)
  const { isGameStart } = useAppSelector(getGameConfig)

  const toggleLoginModal = () => {
    dispatch(modalsActions.toggleLoginModal())
  }

  const toggleRegisterModal = () => {
    dispatch(modalsActions.toggleRegisterModal())
  }

  const location = useLocation()

  if (isGameStart || location.pathname.includes('/online-lobby/')) {
    return <div></div>
  }

  return (
    <header className={s.header}>
      <Link to='/' className={s.logo}>
        <FontAwesomeIcon icon={faEarthEurope} />
        <span>GeoGuessr</span>
      </Link>
      <div className={s.controlls}>
        {user !== null ? (
          <HeaderUser user={user} />
        ) : (
          <>
            <PlateBtn
              text={'login'}
              handleClick={toggleLoginModal}
              url={null}
              plate='LG'
            />
            <PlateBtn
              text={'Sing In'}
              handleClick={toggleRegisterModal}
              url={null}
              plate='SG'
              className={s.controlls__btn}
            />
          </>
        )}
      </div>
    </header>
  )
}

export default Header
