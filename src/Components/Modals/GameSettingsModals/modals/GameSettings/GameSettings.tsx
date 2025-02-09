import { useAppDispatch } from '@/hooks/useAppDispatch'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animated, easings, useSpring } from '@react-spring/web'
import React from 'react'
import GameModes from '../../components/GameModes/GameModes'
import TimeRounds from '../../components/TimeRounds/TimeRounds'
import s from './GameSettings.module.scss'

interface GameSettingsProps {
  isOpen: boolean
}

const GameSettings: React.FC<GameSettingsProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch()

  const springStyles = useSpring({
    from: { scale: 0 },
    to: { scale: isOpen ? 1 : 0 },
    config: { duration: 300, easing: easings.easeInOutQuad },
  })

  const closeModal = () => {
    dispatch(modalsActions.closeSettingsModals())
  }

  return (
    <animated.div className={s.modal} style={{ ...springStyles }}>
      <div className={s.header}>
        <span
          className={s.header__countries}
          onClick={() => dispatch(modalsActions.toggleGameCountriesModal())}
        >
          Countries settings
        </span>
        <FontAwesomeIcon
          icon={faXmark}
          className={s.close}
          onClick={closeModal}
        />
      </div>
      <TimeRounds />
      <GameModes />
    </animated.div>
  )
}

export default GameSettings
