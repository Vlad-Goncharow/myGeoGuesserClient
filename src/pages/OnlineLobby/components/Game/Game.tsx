import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import s from './Game.module.scss'
import GameFirstStep from './components/GameFirstStep/GameFirstStep'
import Result from './components/Result/Result'

function Game() {
  const { isRoundEnd, isRoundStart } = useAppSelector(getGameConfig)

  return (
    <div className={s.wrapper}>
      {isRoundEnd && !isRoundStart ? <Result /> : <GameFirstStep />}
    </div>
  )
}

export default Game
