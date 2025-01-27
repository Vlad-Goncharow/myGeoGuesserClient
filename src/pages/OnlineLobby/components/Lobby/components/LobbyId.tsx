import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useParams } from 'react-router-dom'

function LobbyId() {
  const { roomId } = useParams()

  const copyLobbyId = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_CLIENT_URL}${window.location.pathname}`
    )
  }

  return (
    <div onClick={copyLobbyId} className='room-id'>
      <div className='room-id__wrapper'>
        <label htmlFor=''>Join URL</label>
        <input
          type='text'
          readOnly
          value={roomId}
          className='room-id__value'
        />
      </div>

      <div className='room-id__icon'>
        <FontAwesomeIcon icon={faCopy} />
      </div>
    </div>
  )
}

export default LobbyId
