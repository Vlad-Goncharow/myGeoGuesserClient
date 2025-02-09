import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import UseMiniGames from '../../../../../../../../hooks/UseMiniGames'
import { getMiniGame } from '@/redux/slices/MiniGame/selectors/MiniGameSelectors'
import { miniGamegActions } from '@/redux/slices/MiniGame/slice/MiniGame'
import { faPlay, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import s from './MinigameControls.module.scss'

function MinigameControls() {
  UseMiniGames()

  const [startTime, setStartTime] = React.useState<number>(0)
  const [endTime, setEndTime] = React.useState<number>(0)

  const {
    currentRound,
    randomCountry,
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

  React.useEffect(() => {
    if (isMiniGameEnd) {
      setEndTime((performance.now() - startTime) / 1000)
    }
  }, [isMiniGameEnd])

  const nextRound = () => {
    dispatch(miniGamegActions.setSelectedCounty(null))
    dispatch(miniGamegActions.incrementCurrentRound())
  }

  return (
    <div className={s.wrapper}>
      <span className={s.title}>MINI GAME</span>

      <div className={s.main}>
        <div className={s.row}>
          <button className={s.btn} onClick={startGame}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button
            className={s.btn}
            onClick={() => dispatch(miniGamegActions.resetMiniGame())}
          >
            <FontAwesomeIcon icon={faRepeat} />
          </button>
          <div className={s.roudns}>{currentRound} / 5</div>
          {isMiniGameStart && !isMiniGameEnd && (
            <>
              <div className={s.country}>{randomCountry?.name}</div>
            </>
          )}
        </div>

        {isMiniGameStart && (
          <PlateBtn
            handleClick={nextRound}
            plate='NR'
            text='accept'
            url={null}
            className={s.next}
          />
        )}
      </div>
      {isMiniGameStart && !isMiniGameEnd && (
        <div className={s.info}>choosen: {selectedCounty?.name}</div>
      )}
      {isMiniGameEnd && <div className={s.info}>{endTime.toFixed(2)} s</div>}
    </div>
  )
}

export default MinigameControls
