import { GAMEMODS } from '@/config/constants'
import { IUser } from '@/redux/slices/AuthSlice/types'
import {
  coordinatesType,
  GameSettingsType,
  playersCoordinatesGuessType,
} from '@/redux/slices/GameConfig/types'
import { TemporaryUserType } from '@/redux/slices/TemporaryUserSlice/types/TemporaryUserTypes'

type ServerMessage = {
  event: string
  payload: any
}

export class WebSocketService {
  socket: WebSocket | null = null
  private messages: ServerMessage[] = []

  constructor(private url: string) {}

  connect() {
    this.socket = new WebSocket(this.url)

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server')
    }

    this.socket.onmessage = (event: MessageEvent) => {
      const data: ServerMessage = JSON.parse(event.data)
      console.log('Message from server:', data)

      this.messages.push(data)
    }

    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket server')
    }
  }

  disconnect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close()
    }
  }

  createRoom(userId: number) {
    if (this.socket) {
      this.socket.send(JSON.stringify({ event: 'createRoom', admin: userId }))
    }
  }

  joinRoom(roomId: string, user: IUser | TemporaryUserType) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'joinRoom',
          payload: { roomId, user },
        })
      )
    }
  }

  startGame(roomId: string) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'startGame',
          payload: {
            roomId,
          },
        })
      )
    }
  }
  updateRoomSetttings(roomId: string, settings: GameSettingsType) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'updateSettings',
          payload: {
            roomId,
            settings: { ...settings },
          },
        })
      )
    }
  }
  handleGuess(
    roomId: string,
    type: string,
    userId: number | string,
    coordinates: coordinatesType,
    round: number
  ) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'finishGuess',
          payload: {
            roomId,
            type,
            userId,
            coordinates,
            round,
          },
        })
      )
    }
  }
  addCountryGuess(
    roomId: string,
    userId: number | string,
    country: string,
    code: string,
    round: number,
    time: number | null
  ) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'addCountryGuess',
          payload: {
            roomId,
            userId,
            country,
            code,
            round,
            time,
          },
        })
      )
    }
  }
  endCountryModeRound(roomId: string, round: number) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'endCountryModeRound',
          payload: {
            roomId,
            round,
          },
        })
      )
    }
  }
  backToRoom(roomId: string) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'backToRoom',
          payload: {
            roomId,
          },
        })
      )
    }
  }
  setTargetCords(roomId: string, round: number, cords: coordinatesType) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'setTargetCords',
          payload: {
            roomId,
            round,
            cords,
          },
        })
      )
    }
  }
  setTargetCountry(
    roomId: string,
    round: number,
    country: string,
    code: string
  ) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'setTargetCountry',
          payload: {
            roomId,
            round,
            country,
            code,
          },
        })
      )
    }
  }
  gameEnd(roomId: string, mode: string) {
    if (mode === GAMEMODS.COUNTRYGUESSR) {
      if (this.socket && roomId) {
        this.socket.send(
          JSON.stringify({
            event: 'endCountyModeGame',
            payload: {
              roomId,
            },
          })
        )
      }

      return
    }
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'gameEnd',
          payload: {
            roomId,
          },
        })
      )
    }
  }

  getMessages() {
    return this.messages
  }
}
