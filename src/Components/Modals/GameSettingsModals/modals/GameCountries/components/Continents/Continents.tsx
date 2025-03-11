import React from 'react'
import s from './Continents.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { Continent, continents } from '@/config/continents'

interface ContinentProps {
  findContinent: (continent: Continent) => boolean
  toggleContinent: (continent: Continent) => void
}

export const Continents: React.FC<ContinentProps> = ({
  findContinent,
  toggleContinent,
}) => {
  return (
    <div className={s.wrapper}>
      {continents.map((el) => (
        <div
          key={el}
          onClick={() => toggleContinent(el)}
          className={s.continent}
        >
          <div className={s.continent__checkbox}>
            {
              <FontAwesomeIcon
                icon={findContinent(el) ? faSquareCheck : faSquare}
                style={{ color: '#fff' }}
              />
            }
          </div>
          <span>{el}</span>
        </div>
      ))}
    </div>
  )
}
