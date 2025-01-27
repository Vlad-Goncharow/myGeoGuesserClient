import { useAppDispatch } from '@/hooks/useAppDispatch'
import { gameConfigActions } from '@/redux/slices/GameConfig/slice/GameConfigSlice'
import React from 'react'
import Carousel from './components/Carousel/Carousel'
import s from './Home.module.scss'

function Home() {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(gameConfigActions.clearAll())
  }, [])

  return (
    <div className={s.home}>
      <Carousel />
    </div>
  )
}

export default Home
