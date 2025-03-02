import { createSlice } from '@reduxjs/toolkit'
import { GameConfigType } from '../types'

const initialState: GameConfigType = {
  playerCoordinatesGuess: null,
  roundPlayersGuesses: [],
  playersGuesses: [],
  roundsTargets: [],
  finishedGuessPlayersIds: [],
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
    setPlayerCoordinatesGuess: (state, action) => {
      state.playerCoordinatesGuess = action.payload
    },
    setRoundPlayersGuesses: (state, action) => {
      state.roundPlayersGuesses = action.payload
    },
    setPlayersGuesses: (state, action) => {
      state.playersGuesses = action.payload
    },
    setRoundsTargets: (state, action) => {
      state.roundsTargets = action.payload
    },
    addFinishedGuessPlayersIds: (state, action) => {
      state.finishedGuessPlayersIds = [
        ...state.finishedGuessPlayersIds,
        action.payload,
      ]
    },
    deleteFinishedGuessPlayersIds: (state, action) => {
      state.finishedGuessPlayersIds = state.finishedGuessPlayersIds.filter(
        (el) => el !== action.payload
      )
    },
    clearFinishedGuessPlayersIds: (state) => {
      state.finishedGuessPlayersIds = []
    },
    updateSettings: (state, action) => {
      state.settings = action.payload
    },

    clearAll: (state) => {
      state.playerCoordinatesGuess = null
      state.playersGuesses = []
      state.roundPlayersGuesses = []
      state.settings.rounds = 0
      state.settings.gameDiffcult = null
      state.settings.gameMode = ''
      state.settings.maxPlayers = 10
      state.settings.roundTime = 180
      state.roundsTargets = []
    },
  },
})

export const { actions: gameConfigActions } = gameConfigSlice
export const { reducer: gameConfigReducer } = gameConfigSlice
