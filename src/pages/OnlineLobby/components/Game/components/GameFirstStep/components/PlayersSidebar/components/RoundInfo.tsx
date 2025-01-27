import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'

function RoundInfo() {
  const { rounds, roundsPlayed } = useAppSelector(getGameConfig)

  return (
    <div className='current-round-info'>
      <div className='current-round-info__item'>
        <div className='current-round-info__itemTitle'>map</div>
        <div className='current-round-info__itemInfo'>All around world</div>
      </div>
      <div className='current-round-info__item'>
        <div className='current-round-info__itemTitle'>ROUND</div>
        <div className='current-round-info__itemInfo'>
          {roundsPlayed} / {rounds}
        </div>
      </div>
    </div>
  )
}

export default RoundInfo
