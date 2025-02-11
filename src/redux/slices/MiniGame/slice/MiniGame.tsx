import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MiniGameType } from '../types'

const initialState: MiniGameType = {
  isMiniGameEnd: false,
  isMiniGameStart: false,
  currentRound: 0,
  randomCountries: [],
  selectedCounty: null,
  choosenCountries: [],
}

const MiniGame = createSlice({
  name: 'game-config',
  initialState: initialState,
  reducers: {
    setIsMiniGameStart: (state, action) => {
      state.isMiniGameEnd = false
      state.isMiniGameStart = action.payload
    },
    setIsMiniGameEnd: (state, action) => {
      state.isMiniGameStart = false
      state.isMiniGameEnd = action.payload
    },
    setRandomCountry: (state, action) => {
      state.randomCountries.push(action.payload)
    },
    setSelectedCounty: (state, action) => {
      state.selectedCounty = action.payload
    },
    setChoosenCountries: (state, action) => {
      state.choosenCountries.push(action.payload)
    },
    setCurrentRound: (state, action: PayloadAction<number>) => {
      state.currentRound = action.payload
    },
    incrementCurrentRound: (state) => {
      state.currentRound = state.currentRound + 1
    },
    resetMiniGame: (state) => {
      state.isMiniGameEnd = false
      state.isMiniGameStart = false
      state.currentRound = 0
      state.randomCountries = []
      state.choosenCountries = []
      state.selectedCounty = null
    },
  },
})

export const { actions: miniGamegActions } = MiniGame
export const { reducer: miniGamegReducer } = MiniGame
