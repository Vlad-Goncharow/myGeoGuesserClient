import React from 'react'
import { useAppSelector } from './useAppSelector'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import { useNavigate, useParams } from 'react-router-dom'
import { WebSocketContext } from '@/providers/WsProvider'
import { isGameModePinpointing } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import useRandomCords from './useRandomCords'

function useGameControls() {
  const wsRef = React.useContext(WebSocketContext)

  const isModePinpointing = useAppSelector(isGameModePinpointing)
  const navigate = useNavigate()
  const { roundsPlayed, isGameStart } = useAppSelector(getGameState)

  const { roomId } = useParams()

  const {
    getRandomCoordinates,
    checkStreetViewAvailability,
    randomLocation,
    isPanoActive,
    setRandomLocation,
    targetCords,
    targetCountry,
  } = useRandomCords()

  const handleGameRounds = () => {
    setRandomLocation(getRandomCoordinates)
  }

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

  React.useEffect(() => {
    const round = isGameStart ? roundsPlayed + 1 : 1

    if (randomLocation !== null) {
      checkStreetViewAvailability(randomLocation)
    }

    if (isPanoActive) {
      if (wsRef && wsRef.socket && roomId && targetCords) {
        if (!isGameStart) {
          wsRef.startGame(roomId)
        }
        wsRef.setTargetCords(roomId, round, targetCords)
      }

      if (isModePinpointing && wsRef && wsRef.socket && roomId) {
        wsRef.setTargetPinpointing(roomId, round)
      }

      if (wsRef && wsRef.socket && roomId && targetCountry) {
        wsRef.setTargetCountry(
          roomId,
          round,
          targetCountry.country,
          targetCountry.code
        )
      }
    }
  }, [
    targetCords,
    randomLocation,
    isPanoActive,
    wsRef,
    roomId,
    targetCountry,
    checkStreetViewAvailability,
    isModePinpointing,
    isGameStart,
    roundsPlayed,
  ])

  return { handleGameRounds, handleViewResults, backToRoom, backToMenu }
}

export default useGameControls
