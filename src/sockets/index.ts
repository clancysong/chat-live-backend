import { Server as WebSocketServer } from 'ws'
import PlayerSocket from './player-socket'

const createSockets = (wss: WebSocketServer) => {
  const playerSocket = new PlayerSocket(wss)
  return { playerSocket }
}

export default createSockets
