import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppSelector } from '@/hooks/useAppSelector'
import useRandomCords from '@/hooks/useRandomCords'
import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import s from './ResultsFooter.module.scss'

function ResultsFooter() {
  const { user } = useAppSelector(getAuth)

  const { roomAdminId, settings, roundsPlayed, isGameEnd } =
    useAppSelector(getGameConfig)

  const navigate = useNavigate()
  const { roomId } = useParams()

  const wsRef = React.useContext(WebSocketContext)

  const {
    getRandomCoordinates,
    checkStreetViewAvailability,
    isPanoActive,
    randomLocation,
    setRandomLocation,
    targetCords,
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
    }
  }, [targetCords, randomLocation])

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
    <div className={s.footer}>
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
            className={s.btn}
          />
        ) : (
          <PlateBtn
            handleClick={() => {}}
            plate='WH'
            text='Wait Host'
            url={null}
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
