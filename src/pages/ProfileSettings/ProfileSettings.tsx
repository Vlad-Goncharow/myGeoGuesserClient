import React from 'react'
import s from './ProfileSettings.module.scss'
import ProfileSettingsSidebar from './components/ProfileSettingsSidebar/ProfileSettingsSidebar'
import ProfileSettingsWrapper from './components/ProfileSettingsWrapper/ProfileSettingsWrapper'

export default function ProfileSettings() {
  return (
    <div className={s.page}>
      <div className={s.container}>
        <ProfileSettingsSidebar />
        <div className={s.wrapper}>
          <ProfileSettingsWrapper />
        </div>
      </div>
    </div>
  )
}
