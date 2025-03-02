import React from 'react'
import s from './PoinpointingModeControls.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getTemporaryUser } from '@/redux/slices/TemporaryUserSlice/selectors/TemporaryUserSelectors'
import { WebSocketContext } from '@/providers/WsProvider'
import { useParams } from 'react-router-dom'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import classNames from 'classnames'
import {
  getGameState,
  getPoinpointingMode,
} from '@/redux/slices/Game/selectors/gameSelectors'

function PoinpointingModeControls() {
  const { user } = useAppSelector(getAuth)
  const { temporaryUser } = useAppSelector(getTemporaryUser)
  const { roundsPlayed } = useAppSelector(getGameState)
  const { playerGuess } = useAppSelector(getPoinpointingMode)
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
      playerGuess?.lat &&
      playerGuess.lng
    ) {
      wsRef.handleGuess(
        roomId,
        type,
        currentUser.id,
        playerGuess,
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
            disable: !playerGuess?.lat && !playerGuess?.lng,
          })}
        />
      )}
    </div>
  )
}

export default PoinpointingModeControls
