import { useAppSelector } from '@/hooks/useAppSelector'
import { WebSocketContext } from '@/providers/WsProvider'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import { useParams } from 'react-router-dom'

function TimeRounds() {
  const { rounds } = useAppSelector(getGameConfig)

  const wsRef = React.useContext(WebSocketContext)

  const { roomId } = useParams()

  const onChangeGameRounds = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (wsRef && wsRef.socket) {
      wsRef.socket.send(
        JSON.stringify({
          event: 'changeGameRounds',
          payload: {
            roomId,
            rounds: Number(e.target.value),
          },
        })
      )
    }
  }

  return (
    <div className='room-timeRounds'>
      <div className='room-rounds'>
        <div className='room-rounds__input'>
          <label htmlFor='rounds'>Rounds</label>
          <input
            id='rounds'
            type='number'
            value={rounds}
            onChange={onChangeGameRounds}
          />
        </div>
      </div>
      <div className='lobby__time'></div>
    </div>
  )
}

export default TimeRounds
