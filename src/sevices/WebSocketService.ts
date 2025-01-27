import { IUser } from '@/redux/slices/AuthSlice/types'

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
  getMessages() {
    return this.messages
  }
}
