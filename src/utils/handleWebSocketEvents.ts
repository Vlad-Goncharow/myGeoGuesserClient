import { AppDispatch } from '@/redux'
import { gameConfigActions } from '@/redux/slices/GameConfig/slice/GameConfigSlice'
import { WebSocketEvent } from '@/types/webSocket'
import { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

export function handleWebSocketEvents(
  e: any,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  isGameEnd: boolean
) {
  const data: WebSocketEvent = JSON.parse(e.data)

  switch (data.event) {
    case 'newUserJoined':
      dispatch(gameConfigActions.setIsGameStarted(data.payload.isGameStarted))
      dispatch(gameConfigActions.setRoomAdminId(data.payload.admin))
      dispatch(gameConfigActions.setPlayers(data.payload.users))
      dispatch(
        gameConfigActions.setTargetCoortdinates(data.payload.targetCoordinates)
      )
      dispatch(gameConfigActions.setRoundsPlayed(data.payload.roundsPlayed))

      dispatch(gameConfigActions.updateSettings(data.payload.settings))

      if (
        data.payload.user.id !== data.payload.admin &&
        data.payload.isGameStarted
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
      dispatch(gameConfigActions.setIsGameStarted(true))
      dispatch(gameConfigActions.setIsRoundStart(true))
      break

    case 'setedTargetCords':
      dispatch(gameConfigActions.setIsRoundStart(true))
      dispatch(gameConfigActions.setIsRoundEnd(false))
      dispatch(
        gameConfigActions.setTargetCoortdinates(data.payload.targetCoordinates)
      )
      break
    case 'setedTargetCountry':
      dispatch(gameConfigActions.setTargetCountry(data.payload.targetCountries))
      break
    case 'addedCountryGuess':
      dispatch(
        gameConfigActions.setSelectedCountries(data.payload.selectedCountries)
      )
      break
    case 'endCountryModeRound':
      dispatch(
        gameConfigActions.setSelectedCountries(data.payload.selectedCountries)
      )
      dispatch(gameConfigActions.setRoundsPlayed(data.payload.roundsPlayed))
      dispatch(gameConfigActions.setIsRoundEnd(true))
      dispatch(gameConfigActions.setIsRoundStart(false))
      break
    case 'startedNewRound':
      dispatch(gameConfigActions.setSelectedCountries([]))
      dispatch(gameConfigActions.clearCountryPlayerGuesses())
      dispatch(gameConfigActions.setIsRoundEnd(false))
      dispatch(gameConfigActions.setIsRoundStart(true))
      break
    case 'endedCountryModeGame':
      dispatch(
        gameConfigActions.setSelectedCountries(data.payload.selectedCountries)
      )
      dispatch(
        gameConfigActions.setTargetCountries(data.payload.targetCountries)
      )

      dispatch(gameConfigActions.setIsGameEnd(true))
      break

    case 'allPlayersFinished':
      dispatch(gameConfigActions.setIsRoundEnd(true))
      dispatch(gameConfigActions.setIsRoundStart(false))
      dispatch(gameConfigActions.setRoundsPlayed(data.payload.roundsPlayed))
      dispatch(gameConfigActions.setRoundPlayersGuesses(data.payload.guesses))
      dispatch(gameConfigActions.setPlayerCoordinatesGuess([]))
      dispatch(gameConfigActions.clearFinishedGuessPlayersIds())
      break

    case 'gameEnded':
      dispatch(gameConfigActions.setPlayersGuesses(data.payload.guesses))
      dispatch(gameConfigActions.setIsGameEnd(true))
      dispatch(
        gameConfigActions.setRoundsTargets(data.payload.targetCoordinates)
      )
      break

    case 'userLeaveSuccess':
      if (!isGameEnd) {
        dispatch(gameConfigActions.setPlayers(data.payload.users))
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
      dispatch(gameConfigActions.setPlayersGuesses([]))
      dispatch(gameConfigActions.setTargetCoortdinates([]))
      dispatch(gameConfigActions.setRoundsTargets([]))
      dispatch(gameConfigActions.setIsGameEnd(data.payload.room.isGameEnded))
      dispatch(
        gameConfigActions.setIsGameStarted(data.payload.room.isGameStarted)
      )
      dispatch(
        gameConfigActions.setRoundsPlayed(data.payload.room.roundsPlayed)
      )
      dispatch(gameConfigActions.clearCountyMode())
      break

    case 'playerFinishGuess':
      dispatch(
        gameConfigActions.addFinishedGuessPlayersIds(data.payload.userId)
      )
      break

    case 'playerUnFinishGuess':
      dispatch(
        gameConfigActions.deleteFinishedGuessPlayersIds(data.payload.userId)
      )
      break
    case 'settingsUpdated':
      dispatch(gameConfigActions.updateSettings(data.payload.settings))
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
