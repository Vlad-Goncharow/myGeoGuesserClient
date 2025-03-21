import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { GAMEMODS } from '@/config/constants'
import { useAppSelector } from '@/hooks/useAppSelector'
import useGameControls from '@/hooks/useGameControls'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { getGameState } from '@/redux/slices/Game/selectors/gameSelectors'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'
import classNames from 'classnames'
import React from 'react'
import s from './ResultsFooter.module.scss'

function ResultsFooter() {
  const { user } = useAppSelector(getAuth)

  const { roomAdminId, roundsPlayed, isGameEnd } = useAppSelector(getGameState)
  const { settings } = useAppSelector(getGameConfig)

  const { handleGameRounds, backToMenu, backToRoom, handleViewResults } =
    useGameControls()

  return (
    <div
      className={classNames(s.footer, {
        [s.footer_countryMode]: settings.gameMode === GAMEMODS.COUNTRYGUESSR,
      })}
    >
      {!isGameEnd ? (
        settings.rounds === roundsPlayed ? (
          user &&
          user.id === roomAdminId && (
            <PlateBtn
              plate='VR'
              text='View Results'
              url={null}
              handleClick={handleViewResults}
              className={s.btn}
            />
          )
        ) : user && roomAdminId === user.id ? (
          <PlateBtn
            plate='NR'
            text='next round'
            url={null}
            handleClick={handleGameRounds}
            className={classNames(s.btn, s.btn_next)}
          />
        ) : (
          <PlateBtn
            handleClick={() => {}}
            plate='WH'
            text='Wait Host'
            url={null}
            className={classNames(s.btn, s.btn_waitHost)}
          />
        )
      ) : (
        <>
          {user && user.id === roomAdminId && (
            <PlateBtn
              plate='BL'
              text='Back To Lobby'
              url={null}
              handleClick={backToRoom}
              className={s.btn}
            />
          )}
          <PlateBtn
            plate='BM'
            text='Back To Menu'
            url={null}
            handleClick={backToMenu}
            className={classNames(s.btn, s.btn_leave)}
          />
        </>
      )}
    </div>
  )
}

export default ResultsFooter
