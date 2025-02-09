import { useAppSelector } from '@/hooks/useAppSelector'
import { getModals } from '@/redux/slices/Modals/selectors/modalsSelectors'
import { animated, easings, useSpring } from '@react-spring/web'
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
    from: { scale: 0, y: '-50%', x: '-50%' },
    to: {
      scale: gameCountriesModal || gameSettingsModal ? 1 : 0,
      y: '-50%',
      x: '-50%',
    },
    config: { duration: 300, easing: easings.easeInOutQuad },
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
