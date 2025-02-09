import { IUser } from '@/redux/slices/AuthSlice/types'
import {
  coordinatesType,
  GameSettingsType,
  playersCoordinatesGuessType,
} from '@/redux/slices/GameConfig/types'

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

  joinRoom(roomId: string, user: IUser) {
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
    userId: number,
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
  gameEnd(roomId: string) {
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
