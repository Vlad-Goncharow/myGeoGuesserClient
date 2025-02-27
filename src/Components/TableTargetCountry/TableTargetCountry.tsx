import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGame } from '@/redux/slices/Game/selectors/gameSelectors'
import { gameActions } from '@/redux/slices/Game/slice/GameSlice'
import classNames from 'classnames'
import React from 'react'
import s from './TableTargetCountry.module.scss'
import { targetCountriesType } from '@/types/countries'

interface TableTargetCountryProps {
  country: targetCountriesType
  availableTempCountries?: boolean
}

const TableTargetCountry: React.FC<TableTargetCountryProps> = ({
  country,
  availableTempCountries,
}) => {
  const dispatch = useAppDispatch()
  const { countryMode } = useAppSelector(getGame)
  const handleTempCountries = () => {
    if (availableTempCountries) {
      const selected = countryMode.global.selectedCountries.filter(
        (el) => el.round === country.round
      )

      dispatch(gameActions.setTempTargetCountry(country))
      dispatch(gameActions.setTempSelectedCountries(selected))
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
