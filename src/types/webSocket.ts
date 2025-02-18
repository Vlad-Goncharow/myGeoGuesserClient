import { IUser } from '@/redux/slices/AuthSlice/types'
import { GameSettingsType } from '@/redux/slices/GameConfig/types'

export type WebSocketEvent =
  | { event: 'newUserJoined'; payload: NewUserJoinedPayloadType }
  | { event: 'roundsUpdate'; payload: RoundsUpdatePayloadType }
  | { event: 'gameStarted' }
  | { event: 'setedTargetCords'; payload: SetedTargetCordsPayloadType }
  | { event: 'allPlayersFinished'; payload: AllPlayersFinishedPayloadType }
  | { event: 'gameEnded'; payload: GameEndedPayloadType }
  | { event: 'userLeaveSuccess'; payload: UserLeaveSuccessPayloadType }
  | { event: 'backUsersToRoom'; payload: BackUsersToRoomPayloadType }
  | { event: 'playerFinishGuess'; payload: PlayerFinishGuessPayloadType }
  | { event: 'playerUnFinishGuess'; payload: PlayerUnFinishGuessPayloadType }
  | { event: 'settingsUpdated'; payload: SettingsUpdatePayloadType }
  | { event: 'roomClosed'; payload: RoomClosedPayload }

export type NewUserJoinedPayloadType = {
  isGameStarted: boolean
  admin: number
  roundsPlayed: number
  users: IUser[]
  user: IUser
  targetCoordinates: Coordinates[]
  settings: GameSettingsType
}
export type RoundsUpdatePayloadType = {
  rounds: number
}
export type SetedTargetCordsPayloadType = {
  targetCoordinates: Coordinates[]
}
export type AllPlayersFinishedPayloadType = {
  roundsPlayed: number
  guesses: Guess[]
}
export type GameEndedPayloadType = {
  guesses: Guess[]
  targetCoordinates: Coordinates[]
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

export type Coordinates = {
  lat: number
  lng: number
}

type Guess = {
  userId: number
  coordinates: Coordinates
  distance: number
}

type Room = {
  isGameEnded: boolean
  isGameStarted: boolean
  roundsPlayed: number
}
