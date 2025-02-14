import React from 'react'
import { useParams } from 'react-router-dom'
import Avatar from './components/Avatar/Avatar'
import Patchs from './components/Patchs/Patchs'
import Profile from './components/Profile/Profile'

function ProfileSettingsWrapper() {
  const { type } = useParams()

  if (type === 'profile') {
    return <Profile />
  } else if (type === 'patchs') {
    return <Patchs />
  } else if (type === 'avatar') {
    return <Avatar />
  }
}

export default ProfileSettingsWrapper
