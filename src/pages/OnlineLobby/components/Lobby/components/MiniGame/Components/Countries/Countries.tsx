import { useAppSelector } from '@/hooks/useAppSelector'
import { getMiniGame } from '@/redux/slices/MiniGame/selectors/MiniGameSelectors'
import React from 'react'
import s from './Countries.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripLines, faXmark } from '@fortawesome/free-solid-svg-icons'
import { animated, useSpring } from '@react-spring/web'
import * as turf from '@turf/turf'
import countries50 from '@/config/countries50.json'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { miniGamegActions } from '@/redux/slices/MiniGame/slice/MiniGame'
import { countriesListNamesType } from '@/config/subCountries'
import { GlobeMethods } from 'react-globe.gl'

interface CountriesPros {
  globeGlobeRef: React.MutableRefObject<GlobeMethods | undefined>
}

const Countries: React.FC<CountriesPros> = ({ globeGlobeRef }) => {
  const { randomCountries, choosenCountries, isMiniGameEnd } =
    useAppSelector(getMiniGame)
  const [isOpen, setIsOpen] = React.useState(false)

  const animationProps = useSpring({
    opacity: isOpen ? 1 : 0,
    maxHeight: isOpen ? 200 : 0,
    from: { opacity: 0, maxHeight: 0 },
    config: { tension: 250, friction: 25 },
  })

  const dispatch = useAppDispatch()

  const goToCountry = (item: countriesListNamesType) => {
    const country = countries50.features.find(
      (f) =>
        f.properties.NAME === item.name &&
        f.properties.NAME_LONG === item.nameLong
    )

    if (!country) return null

    const type = country.geometry.type as
      | 'Polygon'
      | 'MultiPolygon'
      | 'Point'
      | 'LineString'
      | 'MultiPoint'
      | 'MultiLineString'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cords: any[] = country.geometry.coordinates
    const geometry = turf.geometry(type, cords)
    const area = Math.floor(turf.area(geometry) / 1000000)

    let altitude = 0.8
    if (area < 10000) altitude = 0.1
    else if (area < 50000) altitude = 0.3
    else if (area < 200000) altitude = 0.5
    else if (area > 5000000) altitude = 1.2

    const center = turf.centerOfMass(country)

    dispatch(miniGamegActions.setSelectedCounty(item))

    if (globeGlobeRef.current) {
      globeGlobeRef.current.pointOfView(
        {
          lat: center.geometry.coordinates[1],
          lng: center.geometry.coordinates[0],
          altitude,
        },
        2000
      )
    }
  }

  if (!isMiniGameEnd) {
    return null
  }

  return (
    <div className={s.wrapper}>
      <div className={s.title} onClick={() => setIsOpen(!isOpen)}>
        <span>Countries</span>
        {isOpen ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <FontAwesomeIcon icon={faGripLines} />
        )}
      </div>
      <animated.div style={{ ...animationProps }}>
        <div className={s.list}>
          {randomCountries.map((el: countriesListNamesType, i: number) => (
            <div key={`${i}-${el.name}`} className={s.item}>
              Needed - <span onClick={() => goToCountry(el)}>{el.name}</span> _
              Choosen -{' '}
              <span onClick={() => goToCountry(choosenCountries[i])}>
                {choosenCountries[i].name}
              </span>
            </div>
          ))}
        </div>
      </animated.div>
    </div>
  )
}

export default Countries
