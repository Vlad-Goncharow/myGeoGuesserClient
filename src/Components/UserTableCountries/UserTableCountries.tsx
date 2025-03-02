import { useAppSelector } from '@/hooks/useAppSelector'
import {
  getGame,
  getGameState,
} from '@/redux/slices/Game/selectors/gameSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { IncludeTempUser } from '@/types/users'
import React from 'react'
import FullUserItem from '../FullUserItem/FullUserItem'
import s from './UserTableCountries.module.scss'
interface UserTableCountriesProps {
  user: IncludeTempUser
}

const UserTableCountries: React.FC<UserTableCountriesProps> = ({ user }) => {
  const { countryMode } = useAppSelector(getGame)
  const { settings } = useAppSelector(getGameConfig)
  const { isGameEnd } = useAppSelector(getGameState)

  const rounds = React.useMemo(() => {
    if (isGameEnd) {
      return [
        ...new Set(
          countryMode.global.targetCountries.map((entry) => entry.round)
        ),
      ]
    } else {
      return [
        ...new Set(
          countryMode.global.selectedCountries.map((entry) => entry.round)
        ),
      ]
    }
  }, [
    countryMode.global.selectedCountries,
    countryMode.global.targetCountries,
    isGameEnd,
  ])

  const userGuessTime = React.useCallback(
    (round: number) => {
      const userGuesses = countryMode.global.selectedCountries.filter(
        (el) => el.userId === user.id && el.round === round
      )
      const timeLastGuess = userGuesses[userGuesses.length - 1]

      if (!timeLastGuess || !timeLastGuess.time) {
        return settings.roundTime
      } else {
        return timeLastGuess.time.toFixed(2)
      }
    },
    [countryMode.global.selectedCountries, settings.roundTime, user.id]
  )

  return (
    <tr key={user.id}>
      <td>
        <div className={s.user}>
          <FullUserItem user={user} />
        </div>
      </td>
      {rounds.map((round) => {
        const userEntries = countryMode.global.selectedCountries.filter(
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
