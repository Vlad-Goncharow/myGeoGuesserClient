import { PayloadAction } from '@reduxjs/toolkit'
import { GameInitialState } from '../types/GameTypes'
import { coordinatesType } from '@/types/coordinates'
import { playersCoordinatesGuessType } from '../../GameConfig/types'
import { roundTargetsType } from '../types/PoinpointingModeTypes/PoinpointingModeTypes'

export const poinpointingReducers = {
  setPlayerCoordinatesGuess: (
    state: GameInitialState,
    action: PayloadAction<coordinatesType | null>
  ) => {
    state.poinpointingMode.playerGuess = action.payload
  },
  setRoundPlayersGuesses: (
    state: GameInitialState,
    action: PayloadAction<playersCoordinatesGuessType[]>
  ) => {
    state.poinpointingMode.roundPlayersGuesses = action.payload
  },
  setPlayersGuesses: (
    state: GameInitialState,
    action: PayloadAction<playersCoordinatesGuessType[]>
  ) => {
    state.poinpointingMode.playersGuesses = action.payload
  },
  setRoundsTargets: (
    state: GameInitialState,
    action: PayloadAction<roundTargetsType[] | null>
  ) => {
    state.poinpointingMode.roundsTargets = action.payload
  },
  addFinishedGuessPlayersIds: (
    state: GameInitialState,
    action: PayloadAction<number>
  ) => {
    state.poinpointingMode.finishedGuessPlayersIds = [
      ...state.poinpointingMode.finishedGuessPlayersIds,
      action.payload,
    ]
  },
  deleteFinishedGuessPlayersIds: (
    state: GameInitialState,
    action: PayloadAction<number>
  ) => {
    state.poinpointingMode.finishedGuessPlayersIds =
      state.poinpointingMode.finishedGuessPlayersIds.filter(
        (el) => el !== action.payload
      )
  },
  clearFinishedGuessPlayersIds: (state: GameInitialState) => {
    state.poinpointingMode.finishedGuessPlayersIds = []
  },

  resetPoinpointing: (state: GameInitialState) => {
    state.poinpointingMode.playerGuess = null
    state.poinpointingMode.finishedGuessPlayersIds = []
    state.poinpointingMode.playersGuesses = []
    state.poinpointingMode.roundPlayersGuesses = []
    state.poinpointingMode.roundsTargets = []
  },
}
