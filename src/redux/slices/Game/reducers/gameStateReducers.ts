import { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../AuthSlice/types'
import { coordinatesType } from '@/types/coordinates'
import { GameInitialState } from '../types/GameTypes'

export const gameStateReducers = {
  setIsConnected: (state: GameInitialState, action: PayloadAction<boolean>) => {
    state.gameState.isConnected = action.payload
  },
  setIsRoomFull: (state: GameInitialState, action: PayloadAction<boolean>) => {
    state.gameState.isRoomFull = action.payload
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
    state.gameState.isGameStart = true
    state.gameState.isRoundStart = true
  },
  endGame: (state: GameInitialState) => {
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

  setIsGameStarted: (
    state: GameInitialState,
    action: PayloadAction<boolean>
  ) => {
    state.gameState.isGameStart = action.payload
  },

  setRoundTimeElapsed: (
    state: GameInitialState,
    action: PayloadAction<number>
  ) => {
    state.gameState.roundTimeElapsed = action.payload
  },

  backUsersToRoom: (state: GameInitialState) => {
    state.gameState.isRoundStart = false
    state.gameState.isRoundEnd = false
    state.gameState.isGameEnd = false
    state.gameState.isGameStart = false
    state.gameState.roundsPlayed = 0
    state.gameState.targetCoordinates = null
  },

  resetState: (state: GameInitialState) => {
    state.gameState.players = []
    state.gameState.roomId = null
    state.gameState.roomAdminId = null
    state.gameState.isConnected = false
    state.gameState.isGameStart = false
    state.gameState.isGameEnd = false
    state.gameState.isRoundEnd = false
    state.gameState.isRoundStart = false
    state.gameState.roundsPlayed = 0
    state.gameState.targetCoordinates = null
  },

  setTargetCoortdinates: (
    state: GameInitialState,
    action: PayloadAction<coordinatesType | null>
  ) => {
    state.gameState.targetCoordinates = action.payload
  },
}
