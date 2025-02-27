import { countryModeType } from './CountryModeTypes/CountryModeTypes'
import { gameStateType } from './gameState/gameState'
import { poinpointingType } from './PoinpointingModeTypes/PoinpointingModeTypes'

export interface GameInitialState {
  gameState: gameStateType
  countryMode: countryModeType
  poinpointingMode: poinpointingType
}
