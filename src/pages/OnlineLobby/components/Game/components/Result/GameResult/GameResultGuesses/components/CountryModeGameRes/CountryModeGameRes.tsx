import TableTargetCountry from '@/Components/TableTargetCountry/TableTargetCountry'
import UserTableCountries from '@/Components/UserTableCountries/UserTableCountries'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import s from './CountryModeGameRes.module.scss'

function CountryModeGameRes() {
  const { countriesMode, players } = useAppSelector(getGameConfig)

  return (
    <div className={s.tableContainer}>
      <div className='country-users-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {countriesMode.global.targetCountries.map((country) => (
                <TableTargetCountry
                  country={country}
                  key={`${country.round}-${country.country}`}
                  availableTempCountries={true}
                />
              ))}
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

export default CountryModeGameRes
