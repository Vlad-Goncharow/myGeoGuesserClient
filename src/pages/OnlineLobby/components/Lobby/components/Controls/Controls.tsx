import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppSelector } from '@/hooks/useAppSelector'
import useRandomCords from '@/hooks/useRandomCords'
import { WebSocketContext } from '@/providers/WsProvider'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import s from './Controls.module.scss'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import { isGameModePoinpointing } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'

function Controls() {
  const { user } = useAppSelector(getAuth)

  const { roomAdminId } = useAppSelector(getGameState)
  const { roomId } = useParams()
  const wsRef = React.useContext(WebSocketContext)
  const isModePoinpointing = useAppSelector(isGameModePoinpointing)

  const {
    getRandomCoordinates,
    checkStreetViewAvailability,
    randomLocation,
    isPanoActive,
    setRandomLocation,
    targetCords,
    targetCountry,
  } = useRandomCords()

  const startGame = () => {
    setRandomLocation(getRandomCoordinates)
  }

  React.useEffect(() => {
    if (randomLocation !== null) {
      checkStreetViewAvailability(randomLocation)
    }

    if (isPanoActive) {
      if (wsRef && wsRef.socket && roomId && targetCords) {
        wsRef.startGame(roomId)
        wsRef.setTargetCords(roomId, 1, targetCords)
      }
      console.log(isModePoinpointing);
      console.log(targetCountry);
      
      if(isModePoinpointing && wsRef && wsRef.socket && roomId) {
        wsRef.setTargetPoinpointing(
          roomId,
          1
        )
      }

      if (wsRef && wsRef.socket && roomId && targetCountry) {
        wsRef.setTargetCountry(
          roomId,
          1,
          targetCountry.country,
          targetCountry.code
        )
      }
    }
  }, [targetCords, randomLocation, isPanoActive, wsRef, roomId, targetCountry, checkStreetViewAvailability, isModePoinpointing])

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
    <div className={s.controls}>
      {user && user.id === roomAdminId ? (
        <PlateBtn
          plate='SG'
          text='Start online game'
          url={null}
          handleClick={startGame}
          className={s.controls__start}
        />
      ) : (
        <PlateBtn
          plate='WH'
          text='wait host'
          url={null}
          handleClick={waitHostHandle}
          className={s.controls__wait}
        />
      )}
    </div>
  )
}

export default Controls
