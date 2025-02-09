import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MiniGameType } from '../types'

const initialState: MiniGameType = {
  isMiniGameEnd: false,
  isMiniGameStart: false,
  currentRound: 0,
  randomCountry: null,
  selectedCounty: null,
}

const MiniGame = createSlice({
  name: 'game-config',
  initialState: initialState,
  reducers: {
    setIsMiniGameStart: (state, action) => {
      state.currentRound = 1
      state.isMiniGameEnd = false
      state.isMiniGameStart = action.payload
    },
    setIsMiniGameEnd: (state, action) => {
      state.currentRound = 0
      state.isMiniGameStart = false
      state.isMiniGameEnd = action.payload
    },
    setRandomCountry: (state, action) => {
      state.randomCountry = action.payload
    },
    setSelectedCounty: (state, action) => {
      state.selectedCounty = action.payload
    },
    setCurrentRound: (state, action: PayloadAction<number>) => {
      state.currentRound = action.payload
    },
    incrementCurrentRound: (state) => {
      state.currentRound = state.currentRound + 1
    },
    decrementCurrentRound: (state) => {
      state.currentRound = state.currentRound - 1
    },
    resetMiniGame: (state) => {
      state.isMiniGameEnd = false
      state.isMiniGamePaused = false
      state.isMiniGameStart = false
      state.currentRound = 0
      state.randomCountry = null
      state.selectedCounty = null
    },
  },
})

export const { actions: miniGamegActions } = MiniGame
export const { reducer: miniGamegReducer } = MiniGame
