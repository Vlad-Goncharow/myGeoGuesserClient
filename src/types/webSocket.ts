import { IUser } from '@/redux/slices/AuthSlice/types'
import { GameSettingsType } from '@/redux/slices/GameConfig/types'
import { coordinatesType } from './coordinates'
import { targetCountriesType } from './countries'
import { countryModePlayersGuessesType } from '@/redux/slices/Game/types/CountryModeTypes/CountryModeTypes'
import {
  playersCoordinatesGuessType,
  roundTargetsType,
} from '../redux/slices/Game/types/PinpointingModeTypes/PinpointingModeTypes'

export type WebSocketEvent =
  | { event: 'newUserJoined'; payload: NewUserJoinedPayloadType }
  | { event: 'roundsUpdate'; payload: RoundsUpdatePayloadType }
  | { event: 'gameStarted' }
  | { event: 'setedTargetCords'; payload: SetedTargetCordsPayloadType }
  | {
      event: 'endedPinpointingModeRound'
      payload: AllPlayersFinishedPayloadType
    }
  | { event: 'gameEnded'; payload: GameEndedPayloadType }
  | { event: 'userLeaveSuccess'; payload: UserLeaveSuccessPayloadType }
  | { event: 'backUsersToRoom'; payload: BackUsersToRoomPayloadType }
  | { event: 'playerFinishGuess'; payload: PlayerFinishGuessPayloadType }
  | { event: 'playerUnFinishGuess'; payload: PlayerUnFinishGuessPayloadType }
  | { event: 'settingsUpdated'; payload: SettingsUpdatePayloadType }
  | { event: 'roomClosed'; payload: RoomClosedPayload }
  | { event: 'setedTargetCountry'; payload: SetedTargetCountryPayloadType }
  | { event: 'addedCountryGuess'; payload: AddedCountryGuessPayloadType }
  | { event: 'endCountryModeRound'; payload: EndCountryModeRoundPayloadType }
  | { event: 'startedNewRound' }
  | { event: 'endedCountryModeGame'; payload: EndedCountryModeGamePayloadType }

export type NewUserJoinedPayloadType = {
  gameState: {
    isGameStarted: boolean
    adminId: number
    roundsPlayed: number
    targetCoordinates: coordinatesType | null
  }
  users: IUser[]
  user: IUser
  settings: GameSettingsType
}
export type RoundsUpdatePayloadType = {
  rounds: number
}
export type SetedTargetCordsPayloadType = {
  targetCoordinates: coordinatesType
}
export type SetedTargetCountryPayloadType = {
  target: targetCountriesType
}
export type AddedCountryGuessPayloadType = {
  guesses: countryModePlayersGuessesType[]
}
export type EndCountryModeRoundPayloadType = {
  guesses: countryModePlayersGuessesType[]
  roundsPlayed: number
}
export type EndedCountryModeGamePayloadType = {
  guesses: countryModePlayersGuessesType[]
  targets: targetCountriesType[]
}

export type AllPlayersFinishedPayloadType = {
  roundsPlayed: number
  guesses: playersCoordinatesGuessType[]
}
export type GameEndedPayloadType = {
  guesses: playersCoordinatesGuessType[]
  targets: roundTargetsType[]
}
export type UserLeaveSuccessPayloadType = {
  userLeave: IUser
  users: IUser[]
}
export type BackUsersToRoomPayloadType = {
  room: Room
}
export type PlayerFinishGuessPayloadType = {
  userId: number
}
export type PlayerUnFinishGuessPayloadType = {
  userId: number
}

export type RoomClosedPayload = {
  message: string
}

export type SettingsUpdatePayloadType = {
  settings: GameSettingsType
}

type Room = {
  isGameEnded: boolean
  isGameStarted: boolean
  roundsPlayed: number
}
