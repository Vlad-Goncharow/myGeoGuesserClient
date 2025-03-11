import { useAppSelector } from '@/hooks/useAppSelector'
import { getModals } from '@/redux/slices/Modals/selectors/modalsSelectors'
import { animated, useSpring } from '@react-spring/web'
import React from 'react'
import s from './GameSettingsWrapper.module.scss'

interface GameSettingsWrapperProps {
  children: JSX.Element
}

const GameSettingsWrapper: React.FC<GameSettingsWrapperProps> = ({
  children,
}) => {
  const { gameCountriesModal, gameSettingsModal } = useAppSelector(getModals)
  const springStyles = useSpring({
    from: {
      scale: 0.5,
      y: '-50%',
      x: '-50%',
      zIndex: -1,
      opacity: 0,
    },
    to: {
      scale: gameCountriesModal || gameSettingsModal ? 1 : 0.5,
      y: '-50%',
      x: '-50%',
      zIndex: gameCountriesModal || gameSettingsModal ? 11 : -1,
      opacity: gameCountriesModal || gameSettingsModal ? 1 : 0,
    },
    config: { duration: 100 },
  })
  return (
    <>
      <animated.div style={{ ...springStyles }} className={s.wrapper}>
        {children}
      </animated.div>
    </>
  )
}

export default GameSettingsWrapper
