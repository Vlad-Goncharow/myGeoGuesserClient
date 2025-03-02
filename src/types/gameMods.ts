export interface GameModeType {
  difficulties?: GameDificultType[]
  name: string
  description: string
  icon: string
}

export interface GameDificultType {
  name: string
  description: string
  icon: string
  difficulty: string
}
