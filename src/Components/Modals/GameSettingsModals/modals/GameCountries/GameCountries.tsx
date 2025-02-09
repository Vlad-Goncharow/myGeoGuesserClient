import { animated, easings, useSpring } from '@react-spring/web'
import React from 'react'
import s from './GameCountries.module.scss'

interface GameCountriesProps {
  isOpen: boolean
}

const GameCountries: React.FC<GameCountriesProps> = ({ isOpen }) => {
  const springStyles = useSpring({
    from: { scale: 0 },
    to: { scale: isOpen ? 1 : 0 },
    config: { duration: 300, easing: easings.easeInOutQuad },
  })

  return (
    <animated.div className={s.countries} style={springStyles}>
      <div>Empty for now</div>
    </animated.div>
  )
}

export default GameCountries
