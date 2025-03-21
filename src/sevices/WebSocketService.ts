import { IUser } from '@/redux/slices/AuthSlice/types'
import { GameSettingsType } from '@/redux/slices/GameConfig/types'
import { TemporaryUserType } from '@/redux/slices/TemporaryUserSlice/types/TemporaryUserTypes'
import { coordinatesType } from '@/types/coordinates'
import { GameType } from '@/types/roomTypes'
import { WebSocketEvent } from '@/types/webSocket'
export class WebSocketService {
  socket: WebSocket | null = null
  private messages: WebSocketEvent[] = []

  constructor(private url: string) {}

  connect() {
    this.socket = new WebSocket(this.url)

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server')
    }

    this.socket.onmessage = (event: MessageEvent) => {
      const data: WebSocketEvent = JSON.parse(event.data)
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

  createRoom(userId: number, type: GameType) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          event: 'createRoom',
          payload: { admin: userId, type },
        })
      )
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

  handleGuessPinpointing(
    roomId: string,
    type: string,
    userId: number | string,
    coordinates: coordinatesType,
    round: number
  ) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'handleGuess',
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

  handleGuessCountry(
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
          event: 'handleGuess',
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

  endRound(roomId: string, round: number) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'endRound',
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

  setTargetPinpointing(roomId: string, round: number) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'setTarget',
          payload: {
            roomId,
            round,
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
          event: 'setTarget',
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

  gameEnd(roomId: string) {
    if (this.socket && roomId) {
      this.socket.send(
        JSON.stringify({
          event: 'endGame',
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
