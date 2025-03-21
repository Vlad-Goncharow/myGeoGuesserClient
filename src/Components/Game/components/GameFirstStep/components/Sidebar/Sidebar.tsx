import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { RoomId } from '@/Components/RoomId/RoomId'
import { useAppSelector } from '@/hooks/useAppSelector'
import { UseClickOutside } from '@/hooks/UseClickOutside'
import useGameControls from '@/hooks/useGameControls'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import { faBars, faCompress, faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animated, easings, useSpring } from '@react-spring/web'
import classNames from 'classnames'
import React from 'react'
import s from './Sidebar.module.scss'

function Sidebar() {
  const { user } = useAppSelector(getAuth)
  const { roomAdminId } = useAppSelector(getGameState)

  const sidebarRef = React.useRef<HTMLDivElement | null>(null)
  UseClickOutside(sidebarRef, () => setIsOpen(false))

  const [isOpen, setIsOpen] = React.useState(false)
  const [isFullScreen, setIsFullScreen] = React.useState(false)

  const { backToMenu, backToRoom } = useGameControls()

  function toggleFullscreen() {
    const isFullscreen = document.fullscreenElement || false

    if (isFullscreen) {
      exitFullscreen()
      setIsFullScreen(false)
    } else {
      enterFullscreen()
      setIsFullScreen(true)
    }
  }

  const enterFullscreen = () => {
    const element = document.documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen()
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  //animation init
  const { left } = useSpring({
    from: { left: '-100%' },
    left: isOpen ? '0' : '-100%',
    duration: 300,
    easing: easings.easeInOutQuad,
  })

  return (
    <>
      {isOpen && (
        <>
          <div className='overlay'></div>
          <animated.div
            className={s.sidebar}
            ref={sidebarRef}
            style={{
              left: left,
            }}
          >
            <RoomId />
            <PlateBtn
              plate='QM'
              text='Quit to Main Menu'
              url={null}
              handleClick={backToMenu}
              className={classNames(s.sidebar__btn, s.sidebar__btn_leave)}
            />
            {user && user.id === roomAdminId && (
              <PlateBtn
                plate='BL'
                text='Back to lobby'
                url={null}
                handleClick={backToRoom}
                className={classNames(s.sidebar__btn, s.sidebar__btn_back)}
              />
            )}
          </animated.div>
        </>
      )}
      <div className={s.controls}>
        <div className={s.controls__item} onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={s.controls__item} onClick={toggleFullscreen}>
          {isFullScreen ? (
            <FontAwesomeIcon icon={faCompress} />
          ) : (
            <FontAwesomeIcon icon={faExpand} />
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar
