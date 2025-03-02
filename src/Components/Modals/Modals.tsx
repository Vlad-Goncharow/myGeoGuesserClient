import React from 'react'
import ApiKeyModal from './ApiKeyModal/ApiKeyModal'
import GameSettingsModals from './GameSettingsModals/GameSettingsModals'
import AuthModals from './AuthModals/AuthModals'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useLocation } from 'react-router-dom'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'

function Modals() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  React.useEffect(() => {
    dispatch(modalsActions.closeAllModals())
  }, [dispatch, location])

  return (
    <>
      <ApiKeyModal />
      <GameSettingsModals />
      <AuthModals />
    </>
  )
}

export default Modals
