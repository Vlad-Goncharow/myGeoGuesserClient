import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { UseClickOutside } from '@/hooks/useCliclOutside'
import LobbyId from '../../../../Lobby/components/LobbyId'
import { WebSocketContext } from '@/providers/WsProvider'
import { faBars, faCompress, faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animated, easings, useSpring } from '@react-spring/web'
import React from 'react'
import { useParams } from 'react-router-dom'

function Sidebar() {
  const wsRef = React.useContext(WebSocketContext)

  const sidebarRef = React.useRef<HTMLDivElement | null>(null)
  UseClickOutside(sidebarRef, () => setIsOpen(false))

  const [isOpen, setIsOpen] = React.useState(false)
  const [isFullScreen, setIsFullScreen] = React.useState(false)

  const { roomId } = useParams()

  function toggleFullscreen() {
    var isFullscreen = document.fullscreenElement || false

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

  const backToRoom = () => {
    if (wsRef && wsRef.socket) {
      wsRef.socket.send(
        JSON.stringify({
          event: 'backToRoom',
          payload: {
            roomId,
          },
        })
      )
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
            className='current-round-sidebar'
            ref={sidebarRef}
            style={{
              left: left,
            }}
          >
            <LobbyId />
            <PlateBtn
              plate='QM'
              text='Quit to Main Menu'
              url={'/'}
              handleClick={() => {}}
              className='current-round-sidebar__btn current-round-sidebar__btn_leave'
            />
            <PlateBtn
              plate='BL'
              text='Back to lobby'
              url={null}
              handleClick={backToRoom}
              className='current-round-sidebar__btn current-round-sidebar__btn_back'
            />
          </animated.div>
        </>
      )}
      <div className='current-round-sidebar__controls current-round-sidebar-controls'>
        <div
          className='current-round-sidebar-controls__item'
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div
          className='current-round-sidebar-controls__item'
          onClick={toggleFullscreen}
        >
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
