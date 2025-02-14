import React from 'react'
import ApiKeyModal from './ApiKeyModal/ApiKeyModal'
import GameSettingsModals from './GameSettingsModals/GameSettingsModals'
import AuthModals from './AuthModals/AuthModals'

function Modals() {
  return (
    <>
      <ApiKeyModal />
      <GameSettingsModals />
      <AuthModals />
    </>
  )
}

export default Modals
