import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppSelector } from '@/hooks/useAppSelector'
import useRandomCords from '@/hooks/useRandomCords'
import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig, isGameModePoinpointing } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import s from './ResultsFooter.module.scss'
import { GAMEMODS } from '@/config/constants'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'

function ResultsFooter() {
  const { user } = useAppSelector(getAuth)

  const { roomAdminId, roundsPlayed, isGameEnd } = useAppSelector(getGameState)
  const { settings } = useAppSelector(getGameConfig)

  const navigate = useNavigate()
  const { roomId } = useParams()

  const wsRef = React.useContext(WebSocketContext)
  const isModePoinpointing = useAppSelector(isGameModePoinpointing)
  const {
    getRandomCoordinates,
    checkStreetViewAvailability,
    isPanoActive,
    randomLocation,
    setRandomLocation,
    targetCords,
    targetCountry,
  } = useRandomCords()

  const handleGuess = () => {
    setRandomLocation(getRandomCoordinates)
  }

  React.useEffect(() => {
    if (randomLocation !== null) {
      checkStreetViewAvailability(randomLocation)
    }

    if (isPanoActive) {
      if (wsRef && wsRef.socket && roomId && targetCords) {
        wsRef.setTargetCords(roomId, roundsPlayed + 1, targetCords)
      }

      if(isModePoinpointing && wsRef && wsRef.socket && roomId) {
        wsRef.setTargetPoinpointing(
          roomId,
          roundsPlayed + 1
        )
      }

      if (wsRef && wsRef.socket && roomId && targetCountry) {
        wsRef.setTargetCountry(
          roomId,
          roundsPlayed + 1,
          targetCountry.country,
          targetCountry.code
        )
      }
    }
  }, [targetCords, randomLocation, isPanoActive, wsRef, roomId, targetCountry, checkStreetViewAvailability, roundsPlayed, isModePoinpointing])

  const handleViewResults = () => {
    if (wsRef && wsRef.socket && roomId) {
      wsRef.gameEnd(roomId)
    }
  }

  const backToRoom = () => {
    if (wsRef && wsRef.socket && roomId) {
      wsRef.backToRoom(roomId)
    }
  }

  const backToMenu = () => {
    if (wsRef && wsRef.socket) {
      wsRef.socket.close()
      navigate(-1)
    }
  }
  return (
    <div
      className={classNames(s.footer, {
        [s.footer_countryMode]: settings.gameMode === GAMEMODS.COUNTRYGUESSR,
      })}
    >
      {!isGameEnd ? (
        settings.rounds === roundsPlayed ? (
          user &&
          user.id === roomAdminId && (
            <PlateBtn
              plate='VR'
              text='View Results'
              url={null}
              handleClick={handleViewResults}
              className={s.btn}
            />
          )
        ) : user && roomAdminId === user.id ? (
          <PlateBtn
            plate='NR'
            text='next round'
            url={null}
            handleClick={handleGuess}
            className={classNames(s.btn, s.btn_next)}
          />
        ) : (
          <PlateBtn
            handleClick={() => {}}
            plate='WH'
            text='Wait Host'
            url={null}
            className={classNames(s.btn, s.btn_waitHost)}
          />
        )
      ) : (
        <>
          {user && user.id === roomAdminId && (
            <PlateBtn
              plate='BL'
              text='Back To Lobby'
              url={null}
              handleClick={backToRoom}
              className={s.btn}
            />
          )}
          <PlateBtn
            plate='BM'
            text='Back To Menu'
            url={null}
            handleClick={backToMenu}
            className={classNames(s.btn, s.btn_leave)}
          />
        </>
      )}
    </div>
  )
}

export default ResultsFooter
