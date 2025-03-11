import { countries, CountryMap } from '@/config/countries_bounds'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameConfigType } from '../types'

const initialState: GameConfigType = {
  settings: {
    rounds: 0,
    gameMode: '',
    gameDiffcult: '',
    roundTime: 0,
    maxPlayers: 10,
  },
  countriesSettings: {
    countries: countries,
  },
}

const gameConfigSlice = createSlice({
  name: 'game-config',
  initialState: initialState,
  reducers: {
    updateSettings: (state, action) => {
      state.settings = action.payload
    },

    setCounties: (state, action: PayloadAction<CountryMap>) => {
      state.countriesSettings.countries = action.payload
    },

    clearAll: (state) => {
      state.settings.rounds = 0
      state.settings.gameDiffcult = null
      state.settings.gameMode = ''
      state.settings.maxPlayers = 10
      state.settings.roundTime = 180
      state.countriesSettings.countries = countries
    },
  },
})

export const { actions: gameConfigActions } = gameConfigSlice
export const { reducer: gameConfigReducer } = gameConfigSlice
