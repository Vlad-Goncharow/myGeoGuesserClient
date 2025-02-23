import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import s from './CountryPlayers.module.scss'

function CountryPlayers() {
  const { players, countriesMode } = useAppSelector(getGameConfig)

  const isUserGuess = (user: any) => {
    const userGuesses = countriesMode.global.selectedCountries.filter(
      (el) => el.userId === user.id
    )
    if (countriesMode.global.targetCountry) {
      const findTargetCountry = userGuesses.find(
        (el) => el.country === countriesMode.global.targetCountry!.country
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
        <div className={s.wrapper}>
          <div
            key={user.id}
            className={classNames(s.user, {
              [s.user_guessed]: isUserGuess(user),
              [s.user_notGuessed]: isUserGuess(user) === false,
            })}
          >
            {user && <FullUserItem user={user} />}

            <div className={s.countries}>
              {countriesMode.global.targetCountry !== null &&
                countriesMode.global.selectedCountries
                  .filter((el) => el.userId === user.id)
                  .filter(
                    (c) =>
                      c.country !== countriesMode.global.targetCountry!.country
                  )
                  .map((el) => (
                    <div className={s.countries__country}>
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
