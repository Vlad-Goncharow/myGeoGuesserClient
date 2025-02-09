import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../AuthSlice/types'
import { GameConfigType, RoundTimeType } from '../types'

const initialState: GameConfigType = {
  players: [],
  roomId: null,
  roomAdminId: null,
  isConnected: false,
  isGameStart: false,
  isGameEnd: false,
  isRoundEnd: false,
  isRoundStart: false,
  roundsPlayed: 0,
  playerCoordinatesGuess: null,
  targetCoordinates: null,
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
    setIsConnected: (state, action) => {
      state.isConnected = action.payload
    },
    setRoomAdminId: (state, action) => {
      state.roomAdminId = action.payload
    },
    setPlayers: (state, action: PayloadAction<IUser[]>) => {
      state.players = action.payload
    },
    setIsGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStart = action.payload
    },
    setIsGameEnd: (state, action: PayloadAction<boolean>) => {
      state.isGameEnd = action.payload
    },
    setRoundsPlayed: (state, action) => {
      state.roundsPlayed = action.payload
    },
    setIsRoundEnd: (state, action) => {
      state.isRoundEnd = action.payload
    },
    setIsRoundStart: (state, action) => {
      state.isRoundStart = action.payload
    },
    setTargetCoortdinates: (state, action) => {
      state.targetCoordinates = action.payload
    },
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
      state.isConnected = false
      state.isGameEnd = false
      state.isRoundEnd = false
      state.isGameStart = false
      state.isRoundStart = false
      state.playerCoordinatesGuess = null
      state.players = []
      state.playersGuesses = []
      state.roomAdminId = null
      state.roomId = null
      state.roundPlayersGuesses = []
      state.settings.rounds = 0
      state.settings.gameDiffcult = null
      state.settings.gameMode = ''
      state.settings.maxPlayers = 10
      state.settings.roundTime = 180
      state.roundsPlayed = 0
      state.roundsTargets = []
      state.targetCoordinates = null
    },
  },
  extraReducers: (builder) => {},
})

export const { actions: gameConfigActions } = gameConfigSlice
export const { reducer: gameConfigReducer } = gameConfigSlice
