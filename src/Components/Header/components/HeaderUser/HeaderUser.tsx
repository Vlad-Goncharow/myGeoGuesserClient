import React from 'react'
import s from './HeaderUser.module.scss'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchLogout } from '@/redux/slices/AuthSlice/thunks'

function HeaderUser() {
  const dispatch = useAppDispatch()
  const [popupIsOpen, setPopupIsOpen] = React.useState<boolean>(false)

  const logout = async () => {
    try {
      dispatch(fetchLogout())
    } catch(e) {

    }
  }

  return (
    <div className={s.user}>
      <div className={s.user__icon} onClick={() => setPopupIsOpen(prev => !prev)}>
        <FontAwesomeIcon icon={faUser} />
      </div>

      {
        popupIsOpen &&
        <div className={s.popup}>
          <div className="logout">
            <button className="btn" onClick={logout}>logout</button>
          </div>
        </div>
      }
    </div>
  )
}

export default HeaderUser