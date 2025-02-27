import { PayloadAction } from '@reduxjs/toolkit'
import { GameInitialState } from '../types/GameTypes'
import {
  countryModePlayersGuessesType,
  countryPlayerGuessesType,
} from '../types/CountryModeTypes/CountryModeTypes'
import { targetCountriesType } from '@/types/countries'

export const countryModeReducers = {
  setCountryPlayerGuesses: (
    state: GameInitialState,
    action: PayloadAction<countryPlayerGuessesType>
  ) => {
    state.countryMode.local.playerGuesses = {
      country: action.payload.country,
      code: action.payload.code,
    }
  },

  setTempSelectedCountries: (
    state: GameInitialState,
    action: PayloadAction<countryModePlayersGuessesType[] | null>
  ) => {
    state.countryMode.local.tempSelectedCountries = action.payload
  },

  setTempTargetCountry: (
    state: GameInitialState,
    action: PayloadAction<targetCountriesType | null>
  ) => {
    state.countryMode.local.tempTargetCountry = action.payload
  },

  setTargetCountry: (
    state: GameInitialState,
    action: PayloadAction<targetCountriesType>
  ) => {
    state.countryMode.global.targetCountry = {
      country: action.payload.country,
      code: action.payload.code,
      round: action.payload.round,
    }
  },

  setTargetCountries: (
    state: GameInitialState,
    action: PayloadAction<targetCountriesType[]>
  ) => {
    state.countryMode.global.targetCountries = action.payload
  },

  setSelectedCountries: (
    state: GameInitialState,
    action: PayloadAction<countryModePlayersGuessesType[]>
  ) => {
    state.countryMode.global.selectedCountries = action.payload
  },

  clearCountryPlayerGuesses: (state: GameInitialState) => {
    state.countryMode.local.playerGuesses = null
  },

  clearCountyMode: (state: GameInitialState) => {
    state.countryMode.local.playerGuesses = null
    state.countryMode.local.tempSelectedCountries = null
    state.countryMode.local.tempTargetCountry = null

    state.countryMode.global.selectedCountries = []
    state.countryMode.global.targetCountries = []
    state.countryMode.global.targetCountry = null
  },
}
