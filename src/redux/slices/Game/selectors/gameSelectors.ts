import { RootState } from '@/redux'

export const getGame = (state: RootState) => state.game
export const getCountriesMode = (state: RootState) => state.game.countryMode
export const getPoinpointingMode = (state: RootState) =>
  state.game.poinpointingMode
export const getGameState = (state: RootState) => state.game.gameState
