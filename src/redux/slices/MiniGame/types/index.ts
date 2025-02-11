import { countriesListNamesType } from '@/config/subCountries'

export interface MiniGameType {
  isMiniGameStart: boolean
  isMiniGameEnd: boolean
  currentRound: number
  selectedCounty: countriesListNamesType | null
  randomCountries: countriesListNamesType[]
  choosenCountries: countriesListNamesType[]
}
