import { modes } from '@/config/modes'
import { WebSocketContext } from '@/providers/WsProvider'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from './useAppSelector'
import { getGameConfig } from '@/redux/slices/GameConfig/selectors/gameConfigSelectors'

function UseGameMods() {
  const wsRef = React.useContext(WebSocketContext)
  const { settings } = useAppSelector(getGameConfig)
  const { roomId } = useParams()

  const changeMode = async (mode: string) => {
    const dific = modes.find((el) => el.name === mode)

    if (wsRef && wsRef.socket && roomId) {
      wsRef.updateRoomSetttings(roomId, {
        ...settings,
        gameMode: mode,
        gameDiffcult:
          dific && dific.difficulties ? dific.difficulties[0].name : null,
      })
    }
  }

  const changeDificult = (mode: string, dific: string) => {
    if (wsRef && wsRef.socket && roomId) {
      wsRef.updateRoomSetttings(roomId, {
        ...settings,
        gameMode: mode,
        gameDiffcult: dific,
      })
    }
  }

  return {
    changeMode,
    changeDificult,
  }
}

export default UseGameMods
