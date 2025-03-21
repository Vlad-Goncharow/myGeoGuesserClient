import React from 'react'
import s from './BgImage.module.scss'
import classNames from 'classnames'
import { quickPlayModes } from '@/config/quickPlayModes'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'

function BgImage() {
  const { settings } = useAppSelector(getGameConfig)

  return (
    <div className={classNames(s.bg)}>
      {quickPlayModes.map((el) => (
        <img
          key={el.name}
          src={el.bg}
          className={classNames('', {
            [s.bg_active]: el.name === settings.gameMode,
          })}
          alt=''
        />
      ))}
    </div>
  )
}

export default BgImage
