import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import UseJoinRoom from '@/hooks/UseJoinRoom'
import useWebSocketHandler from '@/hooks/useWebSocketHandler'
import React from 'react'
import BgImage from './components/BgImage/BgImage'
import Modes from './components/Modes/Modes'
import Players from './components/Players/Players'
import s from './QuickPlay.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import Game from '@/Components/Game/Game'
import useExitConfirmation from '@/hooks/useExitConfirmation'

function QuickPlay() {
  const { isGameStart } = useAppSelector(getGameState)

  useExitConfirmation()
  useWebSocketHandler()
  UseJoinRoom()

  if (isGameStart) {
    return <Game />
  }

  return (
    <div className={s.page}>
      <BgImage />

      <PlateBtn
        handleClick={() => {}}
        plate='BH'
        text='Back Home'
        url={'/'}
        className={s.back}
      />

      <div className={s.info}>
        <h1 className={s.title}>QUICK MATCH</h1>
        <p className={s.description}>
          Get to know a small collection of different game modes geotastic
          provides with just a few clicks. Select a preset, invite some friends
          and have fun!
        </p>
      </div>

      <Modes />
      <Players />
    </div>
  )
}

export default QuickPlay
