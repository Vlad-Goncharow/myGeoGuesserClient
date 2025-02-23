import { targetCountriesType } from '@/redux/slices/GameConfig/types'
import s from './TableTargetCountry.module.scss'
import React from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { gameConfigActions } from '@/redux/slices/GameConfig/slice/GameConfigSlice'
import classNames from 'classnames'

interface TableTargetCountryProps {
  country: targetCountriesType
  availableTempCountries?: boolean
}

const TableTargetCountry: React.FC<TableTargetCountryProps> = ({
  country,
  availableTempCountries,
}) => {
  const dispatch = useAppDispatch()
  const { countriesMode } = useAppSelector(getGameConfig)
  const handleTempCountries = () => {
    if (availableTempCountries) {
      const selected = countriesMode.global.selectedCountries.filter(
        (el) => el.round === country.round
      )

      dispatch(gameConfigActions.setTempTargetCountry(country))
      dispatch(gameConfigActions.setTempSelectedCountries(selected))
    }
  }

  return (
    <th
      onClick={handleTempCountries}
      className={classNames(s.target, {
        [s.target_active]: availableTempCountries,
      })}
    >
      <div className={s.target__image}>
        <img
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`}
          alt={country.country}
        />
      </div>
      <div className={s.target__name}>Round #{country.round}</div>
    </th>
  )
}

export default TableTargetCountry
