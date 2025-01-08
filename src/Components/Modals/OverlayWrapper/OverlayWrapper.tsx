import { faEarthEurope, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface OverlayWrapperProps {
  children: JSX.Element
  closeModal: () => void
}

const OverlayWrapper: React.FC<OverlayWrapperProps> = ({
  children,
  closeModal,
}) => {
  return (
    <div className='dialogWrapper'>
      <header className='dialogWrapper__header'>
        <div className='dialogWrapper__icon'>
          <FontAwesomeIcon icon={faEarthEurope} />
          <span>GeoGuessr</span>
        </div>

        <FontAwesomeIcon
          icon={faXmark}
          onClick={closeModal}
          className='dialogWrapper__close'
        />
      </header>

      {children}
    </div>
  )
}

export default OverlayWrapper
