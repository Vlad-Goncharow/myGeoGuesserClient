import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getMiniGame } from '@/redux/slices/MiniGame/selectors/MiniGameSelectors'
import { miniGamegActions } from '@/redux/slices/MiniGame/slice/MiniGame'
import { faPlay, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import s from './MinigameControls.module.scss'

function MinigameControls() {
  const [startTime, setStartTime] = React.useState<number>(0)
  const [endTime, setEndTime] = React.useState<number>(0)

  const {
    currentRound,
    randomCountries,
    isMiniGameStart,
    selectedCounty,
    isMiniGameEnd,
  } = useAppSelector(getMiniGame)
  const dispatch = useAppDispatch()

  const startGame = () => {
    if (!isMiniGameStart) {
      setStartTime(performance.now())
      dispatch(miniGamegActions.setIsMiniGameStart(true))
    }
  }

  const resetGame = () => {
    setStartTime(0)
    dispatch(miniGamegActions.resetMiniGame())
  }

  React.useEffect(() => {
    if (isMiniGameEnd) {
      setEndTime((performance.now() - startTime) / 1000)
    }
  }, [isMiniGameEnd])

  return (
    <div className={s.wrapper}>
      <span className={s.title}>MINI GAME</span>

      <div className={s.main}>
        <div className={s.row}>
          {(!isMiniGameStart && isMiniGameEnd) || isMiniGameStart ? (
            <button className={s.btn} onClick={resetGame}>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          ) : (
            <button className={s.btn} onClick={startGame}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          <div className={s.roudns}>{currentRound} / 5</div>
          {isMiniGameStart && !isMiniGameEnd && (
            <div className={s.country}>
              {randomCountries[currentRound]?.name}
            </div>
          )}
        </div>
      </div>
      {isMiniGameStart && !isMiniGameEnd && (
        <div className={s.info}>choosen: {selectedCounty?.name}</div>
      )}
      {isMiniGameEnd && <div className={s.info}>{endTime.toFixed(2)} s</div>}
    </div>
  )
}

export default MinigameControls
