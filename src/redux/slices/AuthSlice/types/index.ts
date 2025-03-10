export interface IUser {
  email: string
  nickname: string
  avatar: string
  playedGames: number
  id: number
  isActive: boolean
  patch: string
}

export interface InitStateType {
  user: IUser | null
  isLoading: boolean
  isUserLoaded: boolean
}

//auth
export interface FormRegister {
  email: string
  password: string
  nickname: string
}

export interface FormLogin {
  email: string
  password: string
}

export type FormRegisterFields = 'email' | 'password' | 'nickname'
export type FormLoginFields = 'email' | 'password'

export interface AuthRegisterError {
  message: string
  param: FormRegisterFields
}
export interface AuthLoginError {
  message: string
  param: FormLoginFields
}

export interface AuthResponse {
  user: IUser
  accessToken: string
  refreshToken: string
}

export interface UpdateUserFieldsResponse {
  success: boolean
  user: IUser
}
