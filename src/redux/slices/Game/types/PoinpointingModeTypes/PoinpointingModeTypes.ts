import { coordinatesType } from '@/types/coordinates'

export interface poinpointingType {
  local: poinpointingLocalTypes
  global: poinpointingGlobalTypes
}

export interface poinpointingLocalTypes {
  playerGuess: coordinatesType | null
}

export interface poinpointingGlobalTypes {
  roundPlayersGuesses: playersCoordinatesGuessType[]
  roundsTargets: playersCoordinatesGuessType[] | null
  playersGuesses: playersCoordinatesGuessType[]
  finishedGuessPlayersIds: number[]
}

export interface playersCoordinatesGuessType {
  round: number
  userId: number
  coordinates: coordinatesType
}
