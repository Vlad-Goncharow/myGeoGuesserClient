import {
  faAddressCard,
  faUserPlus,
  faVestPatches,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import s from './ProfileSettingsSidebar.module.scss'

function ProfileSettingsSidebar() {
  return (
    <div className={s.sidebar}>
      <div className={s.nav}>
        <Link to={`/settings/profile`} className={s.item}>
          <FontAwesomeIcon icon={faAddressCard} className={s.item__icon} />
          <span className={s.item__title}>Profile</span>
        </Link>
        <Link to={`/settings/avatar`} className={s.item}>
          <FontAwesomeIcon icon={faUserPlus} className={s.item__icon} />
          <span className={s.item__title}>Avatar</span>
        </Link>
        <Link to={`/settings/patchs`} className={s.item}>
          <FontAwesomeIcon icon={faVestPatches} className={s.item__icon} />
          <span className={s.item__title}>Patchs</span>
        </Link>
      </div>
    </div>
  )
}

export default ProfileSettingsSidebar
