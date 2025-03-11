import { CountryMap } from '@/config/countries_bounds'
import { coordinatesType } from '@/types/coordinates'
import { IUser } from '../../AuthSlice/types'

export interface GameConfigType {
  settings: GameSettingsType
  countriesSettings: CountriesSettingsType
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

export interface CountriesSettingsType {
  countries: CountryMap
}
