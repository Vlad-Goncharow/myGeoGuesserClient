import { useAppSelector } from '@/hooks/useAppSelector'
import { getModals } from '@/redux/slices/Modals/selectors/modalsSelectors'
import React from 'react'
import GameCountries from './modals/GameCountries/GameCountries'
import GameSettings from './modals/GameSettings/GameSettings'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'
import GameSettingsWrapper from './components/GameSettingsWrapper/GameSettingsWrapper'

function GameSettingsModals() {
  const dispatch = useAppDispatch()
  const { gameCountriesModal, gameSettingsModal } = useAppSelector(getModals)

  return (
    <div>
      {(gameCountriesModal || gameSettingsModal) && (
        <div
          onClick={() => dispatch(modalsActions.closeSettingsModals())}
          className='overlay'
        ></div>
      )}
      <GameSettingsWrapper>
        <>
          <GameCountries isOpen={gameCountriesModal} />
          <GameSettings isOpen={gameSettingsModal} />
        </>
      </GameSettingsWrapper>
    </div>
  )
}

export default GameSettingsModals
