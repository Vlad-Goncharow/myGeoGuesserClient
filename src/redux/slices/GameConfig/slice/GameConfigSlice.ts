import { createSlice } from '@reduxjs/toolkit'
import { GameConfigType } from '../types'

const initialState: GameConfigType = {
  settings: {
    rounds: 0,
    gameMode: '',
    gameDiffcult: '',
    roundTime: 0,
    maxPlayers: 10,
  },
}

const gameConfigSlice = createSlice({
  name: 'game-config',
  initialState: initialState,
  reducers: {
    updateSettings: (state, action) => {
      state.settings = action.payload
    },

    clearAll: (state) => {
      state.settings.rounds = 0
      state.settings.gameDiffcult = null
      state.settings.gameMode = ''
      state.settings.maxPlayers = 10
      state.settings.roundTime = 180
    },
  },
})

export const { actions: gameConfigActions } = gameConfigSlice
export const { reducer: gameConfigReducer } = gameConfigSlice
