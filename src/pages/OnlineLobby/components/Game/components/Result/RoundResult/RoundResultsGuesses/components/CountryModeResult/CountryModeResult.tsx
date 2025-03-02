import TableTargetCountry from '@/Components/TableTargetCountry/TableTargetCountry'
import UserTableCountries from '@/Components/UserTableCountries/UserTableCountries'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
  getGame,
  getGameState,
} from '@/redux/slices/Game/selectors/gameSelectors'
import React from 'react'
import s from './CountryModeResult.module.scss'

function CountryModeResult() {
  const { players } = useAppSelector(getGameState)
  const { countryMode } = useAppSelector(getGame)

  return (
    <div className={s.tableContainer}>
      <div className='country-users-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {countryMode.global.targetCountry && (
                <TableTargetCountry
                  country={countryMode.global.targetCountry}
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
