import { PayloadAction } from '@reduxjs/toolkit'
import { GameInitialState } from '../types/GameTypes'
import { coordinatesType } from '@/types/coordinates'
import { playersCoordinatesGuessType } from '../../GameConfig/types'
import { roundTargetsType } from '../types/PinpointingModeTypes/PinpointingModeTypes'

export const pinpointingReducers = {
  setPlayerCoordinatesGuess: (
    state: GameInitialState,
    action: PayloadAction<coordinatesType | null>
  ) => {
    state.pinpointingMode.playerGuess = action.payload
  },
  setRoundPlayersGuesses: (
    state: GameInitialState,
    action: PayloadAction<playersCoordinatesGuessType[]>
  ) => {
    state.pinpointingMode.roundPlayersGuesses = action.payload
  },
  setPlayersGuesses: (
    state: GameInitialState,
    action: PayloadAction<playersCoordinatesGuessType[]>
  ) => {
    state.pinpointingMode.playersGuesses = action.payload
  },
  setRoundsTargets: (
    state: GameInitialState,
    action: PayloadAction<roundTargetsType[] | null>
  ) => {
    state.pinpointingMode.roundsTargets = action.payload
  },
  addFinishedGuessPlayersIds: (
    state: GameInitialState,
    action: PayloadAction<number>
  ) => {
    state.pinpointingMode.finishedGuessPlayersIds = [
      ...state.pinpointingMode.finishedGuessPlayersIds,
      action.payload,
    ]
  },
  deleteFinishedGuessPlayersIds: (
    state: GameInitialState,
    action: PayloadAction<number>
  ) => {
    state.pinpointingMode.finishedGuessPlayersIds =
      state.pinpointingMode.finishedGuessPlayersIds.filter(
        (el) => el !== action.payload
      )
  },
  clearFinishedGuessPlayersIds: (state: GameInitialState) => {
    state.pinpointingMode.finishedGuessPlayersIds = []
  },

  resetPinpointing: (state: GameInitialState) => {
    state.pinpointingMode.playerGuess = null
    state.pinpointingMode.finishedGuessPlayersIds = []
    state.pinpointingMode.playersGuesses = []
    state.pinpointingMode.roundPlayersGuesses = []
    state.pinpointingMode.roundsTargets = []
  },
}
