import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import FullUserItem from '../FullUserItem/FullUserItem'
import s from './UserTableCountries.module.scss'

interface UserTableCountriesProps {
  user: any
}

const UserTableCountries: React.FC<UserTableCountriesProps> = ({ user }) => {
  const { countriesMode, settings, isGameEnd } = useAppSelector(getGameConfig)

  const rounds = React.useMemo(() => {
    if (isGameEnd) {
      return [
        ...new Set(
          countriesMode.global.targetCountries.map((entry) => entry.round)
        ),
      ]
    } else {
      return [
        ...new Set(
          countriesMode.global.selectedCountries.map((entry) => entry.round)
        ),
      ]
    }
  }, [isGameEnd])

  const userGuessTime = React.useCallback(
    (round: number) => {
      const userGuesses = countriesMode.global.selectedCountries.filter(
        (el) => el.userId === user.id && el.round === round
      )
      const timeLastGuess = userGuesses[userGuesses.length - 1]

      if (!timeLastGuess || !timeLastGuess.time) {
        return settings.roundTime
      } else {
        return timeLastGuess.time.toFixed(2)
      }
    },
    [countriesMode.global.selectedCountries, settings.roundTime]
  )

  return (
    <tr key={user.id}>
      <td>
        <div className={s.user}>
          <FullUserItem user={user} />
        </div>
      </td>
      {rounds.map((round) => {
        const userEntries = countriesMode.global.selectedCountries.filter(
          (entry) => entry.userId === user.id && entry.round === round
        )

        return (
          <td key={round} className={s.playerCell}>
            <div className={s.playerCell__wrapper}>
              {userEntries.length > 0
                ? userEntries.map((entry, index) => (
                    <div key={index} className={s.playerCell__country}>
                      <img
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${entry.code}.svg`}
                        alt={entry.country}
                        className={s.flag}
                      />
                    </div>
                  ))
                : null}
            </div>
            <div className={s.time}>{userGuessTime(round)}s</div>
          </td>
        )
      })}
    </tr>
  )
}

export default UserTableCountries
