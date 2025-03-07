import { WebSocketContext } from '@/providers/WsProvider'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from './useAppSelector'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'

function useGameTime() {
  const wsRef = useContext(WebSocketContext)
  const { settings } = useAppSelector(getGameConfig)
  const { isRoundEnd, isRoundStart, roundsPlayed } =
    useAppSelector(getGameState)
  const { roomId } = useParams()

  const [timeElapsed, setTimeElapsed] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const updateTime = useCallback(() => {
    setTimeElapsed((prev) => prev + 1)
  }, [])

  useEffect(() => {
    if (
      isRoundStart &&
      !isRoundEnd &&
      settings.roundTime !== 'Infinity' &&
      timeElapsed < settings.roundTime
    ) {
      timerRef.current = setInterval(updateTime, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRoundStart, isRoundEnd, settings.roundTime, timeElapsed, updateTime])

  useEffect(() => {
    if (timeElapsed === settings.roundTime && wsRef && roomId) {
      wsRef.endRound(roomId, roundsPlayed + 1)
    }
  }, [roomId, roundsPlayed, settings.roundTime, timeElapsed, wsRef])

  return { timeElapsed }
}

export default useGameTime
