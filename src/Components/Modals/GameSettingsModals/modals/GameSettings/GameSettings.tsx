import { useAppDispatch } from '@/hooks/useAppDispatch'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import GameModes from '../../components/GameModes/GameModes'
import TimeRounds from '../../components/TimeRounds/TimeRounds'
import s from './GameSettings.module.scss'

const GameSettings = () => {
  const dispatch = useAppDispatch()

  const closeModal = () => {
    dispatch(modalsActions.closeSettingsModals())
  }

  return (
    <div className={s.modal}>
      <div className={s.header}>
        <span
          className={s.header__countries}
          onClick={() => dispatch(modalsActions.toggleGameCountriesModal())}
        >
          Countries settings
        </span>
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: '#fff', cursor: 'pointer' }}
          onClick={closeModal}
        />
      </div>
      <TimeRounds />
      <GameModes />
    </div>
  )
}

export default GameSettings
