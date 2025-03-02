import { coordinatesType } from '@/types/coordinates'

export interface poinpointingType {
  playerGuess: coordinatesType | null
  roundPlayersGuesses: playersCoordinatesGuessType[]
  roundsTargets: roundTargetsType[] | null
  playersGuesses: playersCoordinatesGuessType[]
  finishedGuessPlayersIds: number[]
}
export interface playersCoordinatesGuessType {
  round: number
  userId: number
  coordinates: coordinatesType
}

export interface roundTargetsType {
  round: number
  coordinates: coordinatesType
}
