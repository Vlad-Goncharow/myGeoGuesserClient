import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppSelector } from '@/hooks/useAppSelector'
import useGameControls from '@/hooks/useGameControls'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import React from 'react'
import { toast } from 'react-toastify'
import s from './Controls.module.scss'

function Controls() {
  const { user } = useAppSelector(getAuth)

  const { roomAdminId } = useAppSelector(getGameState)

  const { handleGameRounds } = useGameControls()

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
          handleClick={handleGameRounds}
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
