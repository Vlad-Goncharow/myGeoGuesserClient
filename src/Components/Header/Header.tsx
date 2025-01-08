import React from 'react'
import s from './Header.module.scss'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getModals } from '@/redux/slices/Modals/selectors/modalsSelectors'
import Register from '../Modals/AuthModals/modals/Register/Register'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import HeaderUser from './components/HeaderUser/HeaderUser'

function Header() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(getAuth)

  const toggleLoginModal = () => {
    dispatch(modalsActions.toggleLoginModal())
  }

  const toggleRegisterModal = () => {
    dispatch(modalsActions.toggleRegisterModal())
  }

  return (
    <header className={s.header}>
      <Link to='/' className={s.logo}>
        <FontAwesomeIcon icon={faEarthEurope} />
        <span>GeoGuessr</span>
      </Link>
      <div className={s.controlls}>
        {user !== null ? (
          <HeaderUser />
        ) : (
          <>
            <button className='btn' onClick={toggleLoginModal}>
              Login
            </button>
            <button className='btn' onClick={toggleRegisterModal}>
              Sing In
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
