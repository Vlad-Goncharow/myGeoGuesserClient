import { IUser } from '../../AuthSlice/types'

export interface GameConfigType {
  roomId: string | null
  players: IUser[]
  roomAdminId: number | null
  isConnected: boolean
  roundsPlayed: number
  isGameStart: boolean
  isGameEnd: boolean
  isRoundEnd: boolean
  isRoundStart: boolean
  targetCoordinates: coordinatesType | null
  playerCoordinatesGuess: coordinatesType | null
  roundPlayersGuesses: playersCoordinatesGuessType[]
  playersGuesses: playersCoordinatesGuessType[]
  roundsTargets: playersCoordinatesGuessType[] | null
  finishedGuessPlayersIds: number[]
  settings: GameSettingsType
  countriesMode: countryModeType
}

export type GameSettingsType = {
  maxPlayers: number
  gameMode: string
  gameDiffcult: string | null
  roundTime: RoundTimeType
  rounds: number
}

export type RoundTimeType = number | 'Infinity'

export interface playersCoordinatesGuessType {
  round: number
  userId: number
  coordinates: coordinatesType
}

export interface coordinatesType {
  lat: number
  lng: number
}

export interface RoomPlayers {
  user: IUser
  finishGuess: boolean
}

export interface countryModeType {
  local: countryModeLocalTypes
  global: countryModeGlobalTypes
}
export interface countryModeLocalTypes {
  playerGuesses: countryPlayerGuessesType | null
  tempSelectedCountries: countryModePlayersGuessesType[] | null
  tempTargetCountry: targetCountriesType | null
}
export interface countryModeGlobalTypes {
  targetCountry: targetCountriesType | null
  selectedCountries: countryModePlayersGuessesType[]
  targetCountries: targetCountriesType[]
}

export interface countryPlayerGuessesType {
  country: string
  code: string
}

export interface countryModePlayersGuessesType {
  round: number
  userId: number
  country: string
  code: string
  time: number
}

export interface targetCountriesType {
  country: string
  code: string
  round: number
}
