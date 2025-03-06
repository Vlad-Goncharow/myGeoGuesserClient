import { countryModeType } from './CountryModeTypes/CountryModeTypes'
import { gameStateType } from './gameState/gameState'
import { pinpointingType } from './PinpointingModeTypes/PinpointingModeTypes'

export interface GameInitialState {
  gameState: gameStateType
  countryMode: countryModeType
  pinpointingMode: pinpointingType
}
