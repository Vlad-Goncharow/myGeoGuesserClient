import React from 'react'
import s from './PlateBtn.module.scss'
import { Link } from 'react-router-dom'
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

interface PlateBtnProps {
  text: string
  plate: string
  url: string | null
  handleClick: () => void
  className?: string
}

const PlateBtn: React.FC<PlateBtnProps> = ({
  text,
  url,
  plate,
  className,
  handleClick,
}) => {
  return url !== null ? (
    <Link to={url} className={classNames(s.btn, className)}>
      {text}

      <div className={s.btn_plate}>{plate}</div>
      <FontAwesomeIcon icon={faEarthEurope} className={s.btn_icon} />
    </Link>
  ) : (
    <button className={classNames(s.btn, className)} onClick={handleClick}>
      {text}

      <div className={s.btn_plate}>{plate}</div>
      <FontAwesomeIcon icon={faEarthEurope} className={s.btn_icon} />
    </button>
  )
}

export default PlateBtn
