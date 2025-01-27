import React from 'react'
import s from './Footer.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'

function Footer() {
  const { isGameStart } = useAppSelector(getGameConfig)

  if (isGameStart) {
    return null
  }

  return <footer className={s.footer}>footer</footer>
}

export default Footer
