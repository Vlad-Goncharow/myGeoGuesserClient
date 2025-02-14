export interface TemporaryUserInitState {
  temporaryUser: TemporaryUserType | null
}

export interface TemporaryUserType {
  nickname: string
  id: string
}
