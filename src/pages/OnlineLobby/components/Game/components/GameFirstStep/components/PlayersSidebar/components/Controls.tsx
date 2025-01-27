import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppSelector } from '@/hooks/useAppSelector'
import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import { useParams } from 'react-router-dom'

function Controls() {
  const { user } = useAppSelector(getAuth)
  const { roundsPlayed, playerCoordinatesGuess } = useAppSelector(getGameConfig)
  const wsRef = React.useContext(WebSocketContext)

  const { roomId } = useParams()

  const [isFinish, setIsFinish] = React.useState<boolean>(false)

  const handleGuess = (type: string) => {
    if (
      wsRef &&
      wsRef.socket &&
      user &&
      playerCoordinatesGuess?.lat &&
      playerCoordinatesGuess.lng
    ) {
      wsRef.socket.send(
        JSON.stringify({
          event: 'finishGuess',
          payload: {
            roomId,
            type: type,
            userId: user.id,
            coordinates: playerCoordinatesGuess,
            round: roundsPlayed + 1,
          },
        })
      )

      if (type === 'finishGuess') setIsFinish(true)
      if (type === 'unFinishGuess') setIsFinish(false)
    }
  }

  return (
    <div className='current-round-controls'>
      {isFinish ? (
        <PlateBtn
          plate='SG'
          text='un submit guess'
          url={null}
          handleClick={() => handleGuess('unFinishGuess')}
          className={'current-round-controls__btn'}
        />
      ) : (
        <PlateBtn
          plate='SG'
          text='submit guess'
          url={null}
          handleClick={() => handleGuess('finishGuess')}
          className={classNames('current-round-controls__btn', {
            disable:
              !playerCoordinatesGuess?.lat && !playerCoordinatesGuess?.lng,
          })}
        />
      )}
    </div>
  )
}

export default Controls
