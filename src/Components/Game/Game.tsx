import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import React from 'react'
import s from './Game.module.scss'
import GameFirstStep from './components/GameFirstStep/GameFirstStep'
import Result from './components/Result/Result'

function Game() {
  const { isRoundEnd, isRoundStart } = useAppSelector(getGameState)

  return (
    <div className={s.wrapper}>
      {isRoundEnd && !isRoundStart ? <Result /> : <GameFirstStep />}
    </div>
  )
}

export default Game
