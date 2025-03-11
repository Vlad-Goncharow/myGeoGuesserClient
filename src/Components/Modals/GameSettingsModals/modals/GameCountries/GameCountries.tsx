import { animated, useSpring } from '@react-spring/web'
import React from 'react'
import { Continents } from './components/Continents/Continents'
import { Countries } from './components/Countries/Countries'
import s from './GameCountries.module.scss'
import useCountries from '@/hooks/useCountries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'

interface GameCountriesProps {
  isOpen: boolean
}

const GameCountries: React.FC<GameCountriesProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch()
  const springStyles = useSpring({
    from: {
      scale: 0.5,
      zIndex: -1,
      opacity: 0,
    },
    to: {
      scale: isOpen ? 1 : 0.5,
      zIndex: isOpen ? 6 : -1,
      opacity: isOpen ? 1 : 0,
    },
    config: { duration: 100 },
  })

  const {
    findCountry,
    toggleCountry,
    selectedCountries,
    findContinent,
    toggleContinent,
  } = useCountries()

  return (
    <animated.div className={s.countries} style={springStyles}>
      <div className={s.header}>
        <span>Change included groups</span>
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: '#fff', cursor: 'pointer' }}
          onClick={() => dispatch(modalsActions.toggleGameCountriesModal())}
        />
      </div>
      <div className={s.row}>
        <Continents
          findContinent={findContinent}
          toggleContinent={toggleContinent}
        />
        {isOpen && (
          <Countries
            findCountry={findCountry}
            toggleCountry={toggleCountry}
            selectedCountries={selectedCountries}
          />
        )}
      </div>
    </animated.div>
  )
}

export default GameCountries
