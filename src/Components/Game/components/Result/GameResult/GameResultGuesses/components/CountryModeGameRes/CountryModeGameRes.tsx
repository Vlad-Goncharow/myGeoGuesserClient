import TableTargetCountry from '@/Components/TableTargetCountry/TableTargetCountry'
import UserTableCountries from '@/Components/UserTableCountries/UserTableCountries'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
  getGame,
  getGameState,
} from '@/redux/slices/Game/selectors/gameSelectors'
import React from 'react'
import s from './CountryModeGameRes.module.scss'

function CountryModeGameRes() {
  const { players } = useAppSelector(getGameState)
  const { countryMode } = useAppSelector(getGame)

  return (
    <div className={s.tableContainer}>
      <div className='country-users-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {countryMode.global.targetCountries.map((country) => (
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
