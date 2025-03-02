import { useAppDispatch } from '@/hooks/useAppDispatch'
import React from 'react'
import Carousel from './components/Carousel/Carousel'
import s from './Home.module.scss'
import { gameActions } from '@/redux/slices/Game/slice/GameSlice'

function Home() {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(gameActions.resetState())
    dispatch(gameActions.clearCountyMode())
    dispatch(gameActions.resetPoinpointing())
  }, [dispatch])

  return (
    <div className={s.home}>
      <Carousel />
    </div>
  )
}

export default Home
