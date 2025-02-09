import { modes } from '@/config/modes'
import { useAppSelector } from '@/hooks/useAppSelector'
import UseGameMods from '../../../../../hooks/UseGameMods'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import s from './GameModes.module.scss'

function GameModes() {
  const { settings } = useAppSelector(getGameConfig)

  const { changeDificult, changeMode } = UseGameMods()

  return (
    <div className={s.modes}>
      {modes.map((mode) => (
        <div
          key={mode.name}
          className={s.mode}
          onClick={() => changeMode(mode.name)}
        >
          <div className={s.mode__pt}></div>

          <div className={s.content}>
            <div
              className={classNames(s.content__mode, {
                [s.content__mode_active]: settings.gameMode === mode.name,
                [s.content__mode_hasChild]: mode.difficulties?.length,
              })}
            >
              <div className={s.info}>
                <div className={s.info__icon}>
                  <img src={mode.icon} alt='' />
                </div>
                <div className={s.info__name}>{mode.name}</div>
              </div>

              <div className={s.description}>
                <p>
                  {settings.gameDiffcult !== null &&
                  settings.gameMode === mode.name
                    ? mode.difficulties?.find(
                        (el) => el.name === settings.gameDiffcult
                      )?.description
                    : mode.description}
                </p>
              </div>
            </div>
            <div className={s.difficult}>
              {mode.difficulties?.map((dif) => (
                <div
                  key={dif.name}
                  className={classNames(s.difficult__item, {
                    [s.difficult__item_active]:
                      dif.name === settings.gameDiffcult,
                  })}
                  onClick={(e) => {
                    e.stopPropagation()
                    changeDificult(mode.name, dif.name)
                  }}
                >
                  <div className={s.difficult__icon}>
                    <img src={dif.icon} alt='' />
                  </div>
                  <p className={s.difficult__descr}>{dif.difficulty}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GameModes
