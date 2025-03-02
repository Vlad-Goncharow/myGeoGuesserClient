import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import {
  getGame,
  getGameState,
} from '@/redux/slices/Game/selectors/gameSelectors'
import { gameActions } from '@/redux/slices/Game/slice/GameSlice'
import { getTemporaryUser } from '@/redux/slices/TemporaryUserSlice/selectors/TemporaryUserSelectors'
import classNames from 'classnames'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from './CountryModeControls.module.scss'

function CountryModeControls() {
  const dispatch = useAppDispatch()
  const wsRef = useContext(WebSocketContext)
  const { user } = useAppSelector(getAuth)
  const { temporaryUser } = useAppSelector(getTemporaryUser)
  const { isRoundStart, isRoundEnd, roundsPlayed } =
    useAppSelector(getGameState)
  const { countryMode } = useAppSelector(getGame)
  const { roomId } = useParams()

  const [guessTime, setGuessTime] = useState(0)

  const currentUser = useMemo(
    () => user || temporaryUser,
    [user, temporaryUser]
  )

  const userGuessesCount = useMemo(() => {
    if (!currentUser) return 0
    return countryMode.global.selectedCountries.filter(
      (el) => el.userId === currentUser.id
    ).length
  }, [currentUser, countryMode])

  const isUserGuess = useMemo(() => {
    if (!currentUser || !countryMode.global.targetCountry) return false

    const userGuesses = countryMode.global.selectedCountries.filter(
      (el) => el.userId === currentUser.id
    )
    const findTargetCountry = userGuesses.find(
      (el) => el.country === countryMode.global.targetCountry!.country
    )
    if (findTargetCountry) {
      return true
    }
  }, [countryMode.global, currentUser])

  useEffect(() => {
    if (isRoundStart && !isRoundEnd) {
      setGuessTime(performance.now())
    }
  }, [isRoundStart, isRoundEnd])

  const addGuessCountry = () => {
    if (
      !currentUser ||
      userGuessesCount >= 3 ||
      isUserGuess ||
      !wsRef ||
      !roomId ||
      !countryMode.local.playerGuesses
    )
      return

    const time = (performance.now() - guessTime) / 1000

    wsRef.addCountryGuess(
      roomId,
      currentUser.id,
      countryMode.local.playerGuesses.country,
      countryMode.local.playerGuesses.code,
      roundsPlayed + 1,
      time
    )
    dispatch(gameActions.clearCountryPlayerGuesses())
  }

  return (
    <div className={s.controls}>
      <PlateBtn
        plate='SG'
        text='Submit Guess'
        url={null}
        handleClick={addGuessCountry}
        className={classNames(s.controls__btn, {
          [s.controls__btn_avaible]: countryMode.local.playerGuesses !== null,
          [s.controls__btn_disable]: !countryMode.local.playerGuesses,
          [s.controls__btn_correct]: isUserGuess === true,
          [s.controls__btn_unCorrect]: userGuessesCount === 3,
        })}
      />
    </div>
  )
}

export default CountryModeControls
