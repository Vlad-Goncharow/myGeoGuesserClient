import { IUser } from '../../AuthSlice/types'

export interface GameConfigType {
  roomId: string | null
  players: IUser[]
  roomAdminId: number | null
  isConnected: boolean
  rounds: number
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
}

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
