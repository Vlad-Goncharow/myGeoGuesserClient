import React from 'react'
import s from './Modes.module.scss'
import { quickPlayModes } from '@/config/quickPlayModes'
import { WebSocketContext } from '@/providers/WsProvider'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import useGameControls from '@/hooks/useGameControls'
import { GAMEMODS } from '@/config/constants'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getTemporaryUser } from '@/redux/slices/TemporaryUserSlice/selectors/TemporaryUserSelectors'

const Modes = () => {
  const wsRef = React.useContext(WebSocketContext)

  const { user } = useAppSelector(getAuth)
  const { temporaryUser } = useAppSelector(getTemporaryUser)
  const { roomAdminId } = useAppSelector(getGameState)
  const { settings } = useAppSelector(getGameConfig)

  const { roomId } = useParams()

  const currentUser = user || temporaryUser

  const updateMode = (mode: GAMEMODS) => {
    if (roomId && wsRef && currentUser && currentUser.id === roomAdminId) {
      wsRef.updateRoomSetttings(roomId, {
        ...settings,
        gameMode: mode,
      })
    }
  }

  const { handleGameRounds } = useGameControls()

  return (
    <>
      <div className={s.modes}>
        {quickPlayModes.map((el) => (
          <div
            key={el.name}
            onClick={() => updateMode(el.name)}
            className={classNames(s.mode, {
              [s.mode_active]: el.name === settings.gameMode,
            })}
          >
            <div className={s.mode__image}>
              <img src={el.image} alt='' />
            </div>

            <div className={s.mode__name}>{el.name}</div>

            <div className={s.mode__description}>{el.description}</div>
          </div>
        ))}
      </div>
      {currentUser && (
        <PlateBtn
          handleClick={
            currentUser.id === roomAdminId ? handleGameRounds : () => {}
          }
          plate='SG'
          text={
            currentUser.id === roomAdminId ? 'start quick match' : 'wait host'
          }
          url={null}
          className={s.start}
        />
      )}
    </>
  )
}

export default Modes
