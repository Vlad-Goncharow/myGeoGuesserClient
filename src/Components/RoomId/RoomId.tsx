import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useParams } from 'react-router-dom'
import s from './RoomId.module.scss'

export const RoomId = () => {
  const { roomId } = useParams()

  const copyRoomId = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_CLIENT_URL}/join/${roomId}`
    )
  }

  return (
    <div onClick={copyRoomId} className={s.id}>
      <div className={s.id__wrapper}>
        <label htmlFor=''>Join URL</label>
        <input type='text' readOnly value={roomId} className={s.id__value} />
      </div>

      <div className={s.id__icon}>
        <FontAwesomeIcon icon={faCopy} />
      </div>
    </div>
  )
}
