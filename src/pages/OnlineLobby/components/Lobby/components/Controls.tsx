import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppSelector } from '@/hooks/useAppSelector'
import useRandomCords from '@/hooks/useRandomCords'
import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function Controls() {
  const { user } = useAppSelector(getAuth)

  const { roomAdminId } = useAppSelector(getGameConfig)
  const { roomId } = useParams()
  const wsRef = React.useContext(WebSocketContext)

  const {
    getRandomCoordinates,
    checkStreetViewAvailability,
    randomLocation,
    isPanoActive,
    setRandomLocation,
    targetCords,
  } = useRandomCords()

  const startGame = () => {
    setRandomLocation(getRandomCoordinates)
  }

  React.useEffect(() => {
    if (randomLocation !== null) {
      checkStreetViewAvailability(randomLocation)
    }

    if (isPanoActive) {
      if (wsRef && wsRef.socket) {
        wsRef.socket.send(
          JSON.stringify({
            event: 'startGame',
            payload: {
              roomId,
            },
          })
        )
        wsRef.socket.send(
          JSON.stringify({
            event: 'setTargetCords',
            payload: {
              roomId,
              round: 1,
              cords: targetCords,
            },
          })
        )
      }
    }
  }, [targetCords, randomLocation])

  const waitHostHandle = () => {
    toast.info('Wait host start game', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

  return (
    <div className='room-contols'>
      {user && user.id === roomAdminId ? (
        <PlateBtn
          plate='SG'
          text='Start online game'
          url={null}
          handleClick={startGame}
          className='room-contols__start'
        />
      ) : (
        <PlateBtn
          plate='WH'
          text='wait host'
          url={null}
          handleClick={waitHostHandle}
          className='room-contols__wait'
        />
      )}
    </div>
  )
}

export default Controls
