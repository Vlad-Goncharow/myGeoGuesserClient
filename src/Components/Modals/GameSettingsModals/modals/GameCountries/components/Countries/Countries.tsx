import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import React from 'react'
import s from './Countries.module.scss'
import { countries, CountryData, CountryMap } from '@/config/countries_bounds'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { gameConfigActions } from '@/redux/slices/GameConfig/slice/GameConfigSlice'

interface CountriesProps {
  findCountry: (code: string) => boolean
  toggleCountry: (code: string, country: CountryData) => void
  selectedCountries: CountryMap
}

export const Countries: React.FC<CountriesProps> = ({
  findCountry,
  selectedCountries,
  toggleCountry,
}) => {
  const { countriesSettings } = useAppSelector(getGameConfig)

  const dispatch = useAppDispatch()

  const saveCountries = () => {
    dispatch(gameConfigActions.setCounties(selectedCountries))
  }

  return (
    <div className={s.wrapper}>
      <div className={s.list}>
        {Object.keys(countries).map((el: string) => {
          return (
            <div
              key={el}
              onClick={() => toggleCountry(el, countries[el])}
              className={classNames(s.country, {
                [s.country_disable]: !findCountry(el),
              })}
            >
              <div className={s.country__checkbox}>
                <FontAwesomeIcon
                  icon={findCountry(el) ? faSquareCheck : faSquare}
                  style={{ color: '#fff' }}
                />
              </div>

              <div className={s.country__image}>
                <img
                  src={`https://flagicons.lipis.dev/flags/1x1/${el.toLowerCase()}.svg`}
                  alt=''
                  loading='lazy'
                />
              </div>
              <span>{countries[el].name}</span>
            </div>
          )
        })}
      </div>
      <div className={s.footer}>
        <span className={s.count}>
          Selected countries: {Object.keys(countriesSettings.countries).length}
        </span>
        <PlateBtn
          handleClick={saveCountries}
          plate='SV'
          text='Save'
          url={null}
          className={classNames(s.save, {
            [s.save_changed]:
              Object.keys(countriesSettings.countries).length !==
              Object.keys(selectedCountries).length,
            [s.save_disable]: Object.keys(selectedCountries).length === 0,
          })}
        />
      </div>
    </div>
  )
}
