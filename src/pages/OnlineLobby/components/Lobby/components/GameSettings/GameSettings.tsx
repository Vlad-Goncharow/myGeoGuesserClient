import { modes } from '@/config/modes'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'
import classNames from 'classnames'
import React from 'react'
import s from './GameSettings.module.scss'
import TimeRounds from '../TimeRounds/TimeRounds'
import UseGameMods from '../../../../../../hooks/UseGameMods'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'

function GameSettings() {
  const dispatch = useAppDispatch()
  
  const {user} = useAppSelector(getAuth)
  const { settings, roomAdminId } = useAppSelector(getGameConfig)

  const { changeMode } = UseGameMods()

  if (user && user.id !== roomAdminId) {
    return null
  }


  return (
    <div className={s.wrapper}>
      <TimeRounds />
      <div className={s.header}>
        <span onClick={() => dispatch(modalsActions.toggleGameSettingsModal())}>
          Open Full Setings
        </span>
      </div>
      <div className={s.items}>
        {modes.map((mode) => (
          <div
            key={mode.name}
            className={classNames(s.item, {
              [s.item_active]: settings.gameMode === mode.name,
            })}
            onClick={() => changeMode(mode.name)}
          >
            <div className={s.item__icon}>
              <img src={mode.icon} alt='' />
            </div>
            <div className={s.item__name}>{mode.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameSettings
