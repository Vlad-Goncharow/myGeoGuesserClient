import { useAppSelector } from '@/hooks/useAppSelector'
import useRandomCords from '@/hooks/useRandomCords'
import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'

function RoundResultsFooter() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(getAuth)

  const { roomAdminId, targetCoordinates, rounds, roundsPlayed, isGameEnd } =
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
      if (wsRef && wsRef.socket) {
        wsRef.socket.send(
          JSON.stringify({
            event: 'setTargetCords',
            payload: {
              roomId,
              round: roundsPlayed + 1,
              cords: targetCords,
            },
          })
        )
      }
    }
  }, [targetCords, randomLocation])

  const handleViewResults = () => {
    if (wsRef && wsRef.socket) {
      wsRef.socket.send(
        JSON.stringify({
          event: 'gameEnd',
          payload: {
            roomId,
          },
        })
      )
    }
  }

  const backToRoom = () => {
    if (wsRef && wsRef.socket) {
      wsRef.socket.send(
        JSON.stringify({
          event: 'backToRoom',
          payload: {
            roomId,
          },
        })
      )
    }
  }

  const backToMenu = () => {
    if (wsRef && wsRef.socket) {
      wsRef.socket.close()
      navigate(-1)
    }
  }
  return (
    <div className={'round-result-footer'}>
      {!isGameEnd ? (
        rounds === roundsPlayed ? (
          user && user.id === roomAdminId && 
            <PlateBtn
              plate='VR'
              text='View Results'
              url={null}
              handleClick={handleViewResults}
              className={classNames('round-result-footer-btn')}
            />
        ) : user && roomAdminId === user.id ? (
          <PlateBtn
            plate='NR'
            text='next round'
            url={null}
            handleClick={handleGuess}
            className={classNames(
              'round-result-footer-btn',
              'round-result-footer-btn_results'
            )}
          />
        ) : (
          <span className={classNames('round-result-footer-span')}>
            Wait Host
          </span>
        )
      ) : (
        <>
          {user && user.id === roomAdminId && (
            <PlateBtn
              plate='BL'
              text='Back To Lobby'
              url={null}
              handleClick={backToRoom}
              className={classNames('round-result-footer-btn')}
            />
          )}
          <PlateBtn
            plate='BM'
            text='Back To Menu'
            url={null}
            handleClick={backToMenu}
            className={classNames(
              'round-result-footer-btn',
              'round-result-footer-btn_leave'
            )}
          />
        </>
      )}
    </div>
  )
}

export default RoundResultsFooter
