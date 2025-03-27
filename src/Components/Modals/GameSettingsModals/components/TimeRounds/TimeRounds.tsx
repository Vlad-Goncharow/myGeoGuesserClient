import { useAppSelector } from '@/hooks/useAppSelector'
import { WebSocketContext } from '@/providers/WsProvider'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { GAMESETTINGS } from '../../../../../config/constants'
import { formatTime } from '@/utils/formatTime'
import { faClock, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from './TimeRounds.module.scss'
import { RoundTimeType } from '@/redux/slices/GameConfig/types'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'

function TimeRounds() {
  const { players } = useAppSelector(getGameState)
  const { settings } = useAppSelector(getGameConfig)
  const wsRef = React.useContext(WebSocketContext)
  const { roomId } = useParams()

  const [localRoundTime, setLocalRoundTime] = useState<RoundTimeType>(
    settings.roundTime
  )

  useEffect(() => {
    setLocalRoundTime(settings.roundTime)
  }, [settings.roundTime])

  const sendRoundTimeUpdate = React.useMemo(
    () =>
      debounce((newTime: RoundTimeType) => {
        if (wsRef && wsRef.socket && roomId) {
          wsRef.updateRoomSetttings(roomId, {
            ...settings,
            roundTime: newTime,
          })
        }
      }, 300),
    [wsRef, roomId, settings]
  )

  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value)
    if (!isNaN(newTime)) {
      setLocalRoundTime(newTime)
      sendRoundTimeUpdate(newTime)
    }
  }

  const handleDecreaseTime = () => {
    if (
      localRoundTime !== 'Infinity' &&
      localRoundTime > GAMESETTINGS.MINTIME
    ) {
      const newTime = localRoundTime - 5
      setLocalRoundTime(newTime)
      sendRoundTimeUpdate(newTime)
    }
  }

  const handleIncreaseTime = () => {
    if (
      localRoundTime !== 'Infinity' &&
      localRoundTime < GAMESETTINGS.MAXTIME
    ) {
      const newTime = localRoundTime + 5
      setLocalRoundTime(newTime)
      sendRoundTimeUpdate(newTime)
    }
  }

  const handleInfinityTime = () => {
    setLocalRoundTime('Infinity')
    sendRoundTimeUpdate('Infinity')
  }

  const onChangeGameRounds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRounds = Number(e.target.value)
    if (
      wsRef?.socket &&
      roomId &&
      newRounds >= GAMESETTINGS.MINROUNDS &&
      newRounds <= GAMESETTINGS.MAXROUNDS
    ) {
      wsRef.updateRoomSetttings(roomId, {
        ...settings,
        rounds: newRounds,
      })
    }
  }

  const onChangeMaxPlayers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetPlayers = Number(e.target.value)
    if (
      wsRef?.socket &&
      roomId &&
      targetPlayers >= players.length &&
      targetPlayers <= GAMESETTINGS.MAXPLAYERS
    ) {
      wsRef.updateRoomSetttings(roomId, {
        ...settings,
        maxPlayers: targetPlayers,
      })
    }
  }
  return (
    <div className={s.wrapper}>
      <div className={s.rounds}>
        <div className={s.rounds__input}>
          <label htmlFor='rounds'>Rounds</label>
          <input
            id='rounds'
            type='number'
            min={GAMESETTINGS.MINROUNDS}
            max={GAMESETTINGS.MAXROUNDS}
            value={settings.rounds}
            onChange={onChangeGameRounds}
          />
        </div>
      </div>
      <div className={s.time}>
        <div className={s.time__value}>
          <FontAwesomeIcon icon={faClock} className={s.time__icon} />
          <span>{formatTime(localRoundTime)}</span>
        </div>
        <input
          type='range'
          min={GAMESETTINGS.MINTIME}
          max={GAMESETTINGS.MAXTIME}
          step={5}
          value={
            localRoundTime === 'Infinity'
              ? GAMESETTINGS.MAXTIME
              : localRoundTime
          }
          onChange={onChangeTime}
        />
        <div className={s.time__controls}>
          <button
            onClick={handleDecreaseTime}
            disabled={localRoundTime === 'Infinity'}
          >
            −
          </button>
          <button
            onClick={handleIncreaseTime}
            disabled={localRoundTime === 'Infinity'}
          >
            +
          </button>
          <button onClick={handleInfinityTime}>♾️</button>
        </div>
      </div>
      <div className={s.players}>
        <FontAwesomeIcon icon={faUsers} />
        <input
          type='number'
          onChange={onChangeMaxPlayers}
          min={players.length}
          max={10}
          value={settings.maxPlayers}
          className={s.players__input}
        />
      </div>
    </div>
  )
}

export default TimeRounds
