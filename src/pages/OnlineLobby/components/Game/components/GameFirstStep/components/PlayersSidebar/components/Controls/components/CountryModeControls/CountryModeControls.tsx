import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { gameConfigActions } from '@/redux/slices/GameConfig/slice/GameConfigSlice'
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
  const { isRoundStart, isRoundEnd, roundsPlayed, countriesMode } =
    useAppSelector(getGameConfig)
  const { roomId } = useParams()

  const [guessTime, setGuessTime] = useState(0)

  const currentUser = useMemo(
    () => user || temporaryUser,
    [user, temporaryUser]
  )

  const userGuessesCount = useMemo(() => {
    if (!currentUser) return 0
    return countriesMode.global.selectedCountries.filter(
      (el) => el.userId === currentUser.id
    ).length
  }, [currentUser, countriesMode])

  const isUserGuess = useMemo(() => {
    if (!currentUser || !countriesMode.global.targetCountry) return false

    const userGuesses = countriesMode.global.selectedCountries.filter(
      (el) => el.userId === currentUser.id
    )
    const findTargetCountry = userGuesses.find(
      (el) => el.country === countriesMode.global.targetCountry!.country
    )
    if (findTargetCountry) {
      return true
    }
  }, [countriesMode.global, currentUser])

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
      !countriesMode.local.playerGuesses
    )
      return

    let time = (performance.now() - guessTime) / 1000

    wsRef.addCountryGuess(
      roomId,
      currentUser.id,
      countriesMode.local.playerGuesses.country,
      countriesMode.local.playerGuesses.code,
      roundsPlayed + 1,
      time
    )
    dispatch(gameConfigActions.clearCountryPlayerGuesses())
  }

  return (
    <div className={s.controls}>
      <PlateBtn
        plate='SG'
        text='Submit Guess'
        url={null}
        handleClick={addGuessCountry}
        className={classNames(s.controls__btn, {
          [s.controls__btn_avaible]: countriesMode.local.playerGuesses !== null,
          [s.controls__btn_disable]: !countriesMode.local.playerGuesses,
          [s.controls__btn_correct]: isUserGuess === true,
          [s.controls__btn_unCorrect]: userGuessesCount === 3,
        })}
      />
    </div>
  )
}

export default CountryModeControls
