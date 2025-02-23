import TableTargetCountry from '@/Components/TableTargetCountry/TableTargetCountry'
import UserTableCountries from '@/Components/UserTableCountries/UserTableCountries'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import s from './CountryModeResult.module.scss'

function CountryModeResult() {
  const { players, countriesMode } = useAppSelector(getGameConfig)

  return (
    <div className={s.tableContainer}>
      <div className='country-users-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {countriesMode.global.targetCountry && (
                <TableTargetCountry
                  country={countriesMode.global.targetCountry}
                />
              )}
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <UserTableCountries user={player} key={player.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CountryModeResult
