import { countriesListNames } from '@/config/subCountries'
import { getMiniGame } from '@/redux/slices/MiniGame/selectors/MiniGameSelectors'
import React from 'react'
import { useAppSelector } from './useAppSelector'
import { useAppDispatch } from './useAppDispatch'
import { miniGamegActions } from '@/redux/slices/MiniGame/slice/MiniGame'

function UseMiniGames() {
  const {
    isMiniGameEnd,
    isMiniGameStart,
    currentRound,
    selectedCounty,
    randomCountries,
  } = useAppSelector(getMiniGame)
  const dispatch = useAppDispatch()

  const checkCountryGuess = React.useMemo(() => {
    if (isMiniGameStart && !isMiniGameEnd) {
      if (randomCountries !== null && selectedCounty !== null) {
        if (randomCountries[currentRound]?.name === selectedCounty.name) {
          return true
        } else {
          return false
        }
      } else {
        return null
      }
    }
  }, [
    currentRound,
    isMiniGameEnd,
    isMiniGameStart,
    randomCountries,
    selectedCounty,
  ])

  React.useEffect(() => {
    if (isMiniGameStart && !isMiniGameEnd && currentRound < 5) {
      dispatch(
        miniGamegActions.setRandomCountry(
          countriesListNames[
            Math.floor(Math.random() * countriesListNames.length)
          ]
        )
      )
    }
  }, [currentRound, dispatch, isMiniGameEnd, isMiniGameStart])

  React.useEffect(() => {
    if (currentRound === 5) {
      dispatch(miniGamegActions.setIsMiniGameEnd(true))
    }
  }, [currentRound, dispatch])

  return {
    checkCountryGuess,
  }
}

export default UseMiniGames
