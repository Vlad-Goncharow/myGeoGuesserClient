import { WebSocketService } from '@/sevices/WebSocketService'
import React from 'react'

interface WsProviderProps {
  children: JSX.Element
}

export const WebSocketContext = React.createContext<WebSocketService | null>(
  null
)

const WsProvider: React.FC<WsProviderProps> = ({ children }) => {
  const wsRef = React.useRef(new WebSocketService('ws://localhost:4000'))

  return (
    <WebSocketContext.Provider value={wsRef.current}>
      {children}
    </WebSocketContext.Provider>
  )
}

export default WsProvider
