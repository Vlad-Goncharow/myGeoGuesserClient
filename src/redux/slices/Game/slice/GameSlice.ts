import { createSlice } from '@reduxjs/toolkit'
import { GameInitialState } from '../types/GameTypes'
import { gameStateReducers } from '../reducers/gameStateReducers'
import { countryModeReducers } from '../reducers/countryModeReducers'
import { poinpointingReducers } from '../reducers/poinpointingReducers'

const initialState: GameInitialState = {
  countryMode: {
    local: {
      playerGuesses: null,
      tempSelectedCountries: null,
      tempTargetCountry: null,
    },
    global: {
      targetCountry: null,
      selectedCountries: [],
      targetCountries: [],
    },
  },
  gameState: {
    players: [],
    roomId: null,
    roomAdminId: null,
    isConnected: false,
    isGameStart: false,
    isGameEnd: false,
    isRoundEnd: false,
    isRoundStart: false,
    roundsPlayed: 0,
    targetCoordinates: null,
  },
  poinpointingMode: {
    playerGuess: null,
    finishedGuessPlayersIds: [],
    playersGuesses: [],
    roundPlayersGuesses: [],
    roundsTargets: [],
  },
}

const GameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    ...countryModeReducers,
    ...gameStateReducers,
    ...poinpointingReducers,
  },
})

export const { actions: gameActions } = GameSlice
export const { reducer: gameReducer } = GameSlice
