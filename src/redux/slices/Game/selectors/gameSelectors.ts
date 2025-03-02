import { RootState } from '@/redux'

export const getGame = (state: RootState) => state.game
export const getCountriesMode = (state: RootState) => state.game.countryMode
export const getGameState = (state: RootState) => state.game.gameState
