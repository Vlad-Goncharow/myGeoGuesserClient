import { IUser } from '../../AuthSlice/types'
import { coordinatesType } from '@/types/coordinates'

export interface GameConfigType {
  playerCoordinatesGuess: coordinatesType | null
  roundPlayersGuesses: playersCoordinatesGuessType[]
  playersGuesses: playersCoordinatesGuessType[]
  roundsTargets: playersCoordinatesGuessType[] | null
  finishedGuessPlayersIds: number[]
  settings: GameSettingsType
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

export interface RoomPlayers {
  user: IUser
  finishGuess: boolean
}
