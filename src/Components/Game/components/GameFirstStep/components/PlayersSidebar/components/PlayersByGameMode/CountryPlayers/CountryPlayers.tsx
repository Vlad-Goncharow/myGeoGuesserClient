import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
  getGame,
  getGameState,
} from '@/redux/slices/Game/selectors/gameSelectors'
import classNames from 'classnames'
import React from 'react'
import s from './CountryPlayers.module.scss'
import { IncludeTempUser } from '@/types/users'

function CountryPlayers() {
  const { players } = useAppSelector(getGameState)
  const { countryMode } = useAppSelector(getGame)

  const isUserGuess = (user: IncludeTempUser) => {
    const userGuesses = countryMode.global.selectedCountries.filter(
      (el) => el.userId === user.id
    )
    if (countryMode.global.targetCountry) {
      const findTargetCountry = userGuesses.find(
        (el) => el.country === countryMode.global.targetCountry!.country
      )
      if (findTargetCountry) {
        return true
      }

      if (!findTargetCountry && userGuesses.length === 3) {
        return false
      }
    }
  }

  return (
    <div className={s.list}>
      {players.map((user) => (
        <div key={user.id} className={s.wrapper}>
          <div
            key={user.id}
            className={classNames(s.user, {
              [s.user_guessed]: isUserGuess(user),
              [s.user_notGuessed]: isUserGuess(user) === false,
            })}
          >
            {user && <FullUserItem user={user} />}

            <div className={s.countries}>
              {countryMode.global.targetCountry !== null &&
                countryMode.global.selectedCountries
                  .filter((el) => el.userId === user.id)
                  .filter(
                    (c) =>
                      c.country !== countryMode.global.targetCountry!.country
                  )
                  .map((el) => (
                    <div key={el.code} className={s.countries__country}>
                      <img
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${el.code}.svg`}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CountryPlayers
