import { IUser } from '@/redux/slices/AuthSlice/types'
import { TemporaryUserType } from '@/redux/slices/TemporaryUserSlice/types/TemporaryUserTypes'

export type IncludeTempUser = IUser | (TemporaryUserType & Partial<IUser>)
