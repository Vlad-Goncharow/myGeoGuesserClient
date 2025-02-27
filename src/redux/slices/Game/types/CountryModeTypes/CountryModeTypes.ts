import { targetCountriesType } from '@/types/countries'

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
