import { AppDispatch } from '@/redux'
import { gameActions } from '@/redux/slices/Game/slice/GameSlice'
import { gameConfigActions } from '@/redux/slices/GameConfig/slice/GameConfigSlice'
import { WebSocketEvent } from '@/types/webSocket'
import { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

export function handleWebSocketEvents(
  e: MessageEvent<string>,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  isGameEnd: boolean
) {
  const data: WebSocketEvent = JSON.parse(e.data)

  switch (data.event) {
    case 'newUserJoined':
      dispatch(gameActions.setIsRoomFull(false))
      dispatch(gameActions.setPlayers(data.payload.users))

      if (
        data.payload.user.id !== data.payload.gameState.adminId &&
        data.payload.gameState.isGameStarted
      ) {
        toast.success(`${data.payload.user.nickname} - connect`, {
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
      break
    case 'gameStarted':
      dispatch(gameActions.startGame())
      break
    case 'connected':
      if (data.payload.gameState.isGameStarted) {
        dispatch(gameActions.startGame())
      }

      dispatch(gameActions.setRoomAdminId(data.payload.gameState.adminId))
      dispatch(gameActions.setRoundsPlayed(data.payload.gameState.roundsPlayed))
      dispatch(gameConfigActions.updateSettings(data.payload.settings))

      //targets
      if (data.payload.targetCoordinates) {
        dispatch(
          gameActions.setTargetCoortdinates(data.payload.targetCoordinates)
        )
      }
      if (data.payload.targetCountry) {
        dispatch(gameActions.setTargetCountry(data.payload.targetCountry))
      }

      break

    case 'setedTargetCords':
      dispatch(gameActions.startRound())
      dispatch(
        gameActions.setTargetCoortdinates(data.payload.targetCoordinates)
      )
      break
    case 'setedTargetCountry':
      dispatch(gameActions.setTargetCountry(data.payload.target))
      break
    case 'addedCountryGuess':
      dispatch(gameActions.setSelectedCountries(data.payload.guesses))
      break
    case 'endCountryModeRound':
      dispatch(gameActions.setSelectedCountries(data.payload.guesses))
      dispatch(gameActions.setRoundsPlayed(data.payload.roundsPlayed))
      dispatch(gameActions.endRound())
      break
    case 'startedNewRound':
      dispatch(gameActions.setSelectedCountries([]))
      dispatch(gameActions.clearCountryPlayerGuesses())
      dispatch(gameActions.startRound())
      break
    case 'endedCountryModeGame':
      dispatch(gameActions.setSelectedCountries(data.payload.guesses))
      dispatch(gameActions.setTargetCountries(data.payload.targets))

      dispatch(gameActions.endGame())
      break

    case 'endedPinpointingModeRound':
      dispatch(gameActions.endRound())
      dispatch(gameActions.setRoundsPlayed(data.payload.roundsPlayed))
      dispatch(gameActions.setRoundPlayersGuesses(data.payload.guesses))
      dispatch(gameActions.setPlayerCoordinatesGuess(null))
      dispatch(gameActions.clearFinishedGuessPlayersIds())
      break

    case 'gameEnded':
      dispatch(gameActions.setPlayersGuesses(data.payload.guesses))
      dispatch(gameActions.endGame())
      dispatch(gameActions.setRoundsTargets(data.payload.targets))
      break

    case 'userLeaveSuccess':
      if (!isGameEnd) {
        dispatch(gameActions.setPlayers(data.payload.users))
      }
      toast.info(`${data.payload.userLeave.nickname} - disconnect`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      break

    case 'backUsersToRoom':
      dispatch(gameActions.backUsersToRoom())
      dispatch(gameActions.clearCountyMode())
      dispatch(gameActions.resetPinpointing())
      break

    case 'playerFinishGuess':
      dispatch(gameActions.addFinishedGuessPlayersIds(data.payload.userId))
      break

    case 'playerUnFinishGuess':
      dispatch(gameActions.deleteFinishedGuessPlayersIds(data.payload.userId))
      break
    case 'settingsUpdated':
      dispatch(gameConfigActions.updateSettings(data.payload.settings))
      break
    case 'updatedRoundTimeElapsed':
      dispatch(gameActions.setRoundTimeElapsed(data.payload.roundTimeElapsed))
      break
    case 'RoomIsFull':
      toast.error('Room is full', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })

      navigate('/')
      break

    case 'roomClosed':
      toast.info(data.payload.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })

      navigate('/')

      break

    default:
      console.warn(`Unhandled WebSocket event: ${data}`)
      break
  }
}
