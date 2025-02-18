import React from 'react'
import s from './Loader.module.scss'

function Loader() {
  return (
    <div className={s.wrapper}>
      <div className={s.loader}></div>
    </div>
  )
}

export default Loader
