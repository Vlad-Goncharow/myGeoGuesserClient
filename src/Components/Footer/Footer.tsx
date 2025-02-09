import React from 'react'
import s from './Footer.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import { useLocation } from 'react-router-dom'

function Footer() {
  const { isGameStart } = useAppSelector(getGameConfig)

  const location = useLocation()

  if (isGameStart || location.pathname.includes('/online-lobby/')) {
    return <div></div>
  }

  return <footer className={s.footer}>footer</footer>
}

export default Footer
