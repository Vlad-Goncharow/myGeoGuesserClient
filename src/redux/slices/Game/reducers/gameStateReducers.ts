import { PayloadAction } from '@reduxjs/toolkit'
import { gameStateType } from '../types/gameState/gameState'
import { IUser } from '../../AuthSlice/types'
import { coordinatesType } from '@/types/coordinates'
import { GameInitialState } from '../types/GameTypes'

export const gameStateReducers = {
  setIsConnected: (state: GameInitialState, action: PayloadAction<boolean>) => {
    state.gameState.isConnected = action.payload
  },

  setRoomAdminId: (
    state: GameInitialState,
    action: PayloadAction<number | null>
  ) => {
    state.gameState.roomAdminId = action.payload
  },

  setPlayers: (state: GameInitialState, action: PayloadAction<IUser[]>) => {
    state.gameState.players = action.payload
  },

  setRoundsPlayed: (state: GameInitialState, action: PayloadAction<number>) => {
    state.gameState.roundsPlayed = action.payload
  },

  startGame: (state: GameInitialState) => {
    state.gameState.isGameEnd = false
    state.gameState.isGameStart = true
  },

  endGame: (state: GameInitialState) => {
    state.gameState.isGameStart = false
    state.gameState.isGameEnd = true
  },

  startRound: (state: GameInitialState) => {
    state.gameState.isRoundStart = true
    state.gameState.isRoundEnd = false
  },
  endRound: (state: GameInitialState) => {
    state.gameState.isRoundStart = false
    state.gameState.isRoundEnd = true
  },

  setTargetCoortdinates: (
    state: GameInitialState,
    action: PayloadAction<coordinatesType | null>
  ) => {
    state.gameState.targetCoordinates = action.payload
  },
}
