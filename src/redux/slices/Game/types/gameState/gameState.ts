import { IUser } from '@/redux/slices/AuthSlice/types'
import { coordinatesType } from '@/types/coordinates'

export interface gameStateType {
  roomId: string | null
  players: IUser[]
  roomAdminId: number | null
  isConnected: boolean
  roundsPlayed: number
  isGameStart: boolean
  isGameEnd: boolean
  isRoundEnd: boolean
  isRoundStart: boolean
  targetCoordinates: coordinatesType | null
  roundTimeElapsed: number
}
