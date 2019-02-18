import { Server as WebSocketServer } from 'ws'
import PlayerSocket from './PlayerSocket'

const createSockets = (wss: WebSocketServer) => {
  const playerSocket = new PlayerSocket(wss)
  return { playerSocket }
}

export default createSockets
