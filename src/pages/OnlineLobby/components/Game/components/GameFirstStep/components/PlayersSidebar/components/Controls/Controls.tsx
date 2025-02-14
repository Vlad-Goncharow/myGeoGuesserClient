import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppSelector } from '@/hooks/useAppSelector'
import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import { useParams } from 'react-router-dom'
import s from './Controls.module.scss'
import { getTemporaryUser } from '@/redux/slices/TemporaryUserSlice/selectors/TemporaryUserSelectors'

function Controls() {
  const { user } = useAppSelector(getAuth)
  const { temporaryUser } = useAppSelector(getTemporaryUser)
  const { roundsPlayed, playerCoordinatesGuess } = useAppSelector(getGameConfig)
  const wsRef = React.useContext(WebSocketContext)

  const { roomId } = useParams()

  const [isFinish, setIsFinish] = React.useState<boolean>(false)

  const handleGuess = (type: string) => {
    const currentUser = user || temporaryUser
    if (
      wsRef &&
      wsRef.socket &&
      currentUser &&
      roomId &&
      playerCoordinatesGuess?.lat &&
      playerCoordinatesGuess.lng
    ) {
      wsRef.handleGuess(
        roomId,
        type,
        currentUser.id,
        playerCoordinatesGuess,
        roundsPlayed + 1
      )
      if (type === 'finishGuess') setIsFinish(true)
      if (type === 'unFinishGuess') setIsFinish(false)
    }
  }

  return (
    <div className={s.controls}>
      {isFinish ? (
        <PlateBtn
          plate='SG'
          text='un submit guess'
          url={null}
          handleClick={() => handleGuess('unFinishGuess')}
          className={s.controls__btn}
        />
      ) : (
        <PlateBtn
          plate='SG'
          text='submit guess'
          url={null}
          handleClick={() => handleGuess('finishGuess')}
          className={classNames(s.controls__btn, {
            disable:
              !playerCoordinatesGuess?.lat && !playerCoordinatesGuess?.lng,
          })}
        />
      )}
    </div>
  )
}

export default Controls
