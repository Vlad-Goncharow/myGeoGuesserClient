import { countriesListNames } from '@/config/subCountries'
import { getMiniGame } from '@/redux/slices/MiniGame/selectors/MiniGameSelectors'
import React from 'react'
import { useAppSelector } from './useAppSelector'
import { useAppDispatch } from './useAppDispatch'
import { miniGamegActions } from '@/redux/slices/MiniGame/slice/MiniGame'

function UseMiniGames() {
  const { isMiniGameEnd, isMiniGameStart, currentRound, selectedCounty } =
    useAppSelector(getMiniGame)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (isMiniGameStart && !isMiniGameEnd) {
      dispatch(
        miniGamegActions.setRandomCountry(
          countriesListNames[
            Math.floor(Math.random() * countriesListNames.length)
          ]
        )
      )
    }
  }, [currentRound, isMiniGameStart, isMiniGameEnd])

  React.useEffect(() => {
    let timer: any

    if (currentRound === 6) {
      dispatch(miniGamegActions.setIsMiniGameEnd(true))
    }

    return () => {
      clearInterval(timer)
    }
  }, [isMiniGameEnd, isMiniGameStart, currentRound, selectedCounty])
}

export default UseMiniGames
