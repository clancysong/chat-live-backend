import { Server } from 'http'
import SocketIO from 'socket.io'

class Ws {
  private io: SocketIO.Server

  constructor(server: Server) {
    this.io = SocketIO(server)

    this.io.on('connection', socket => {
      socket.on('test', (data: any) => {
        console.log(data)
      })
    })
  }
}

export default (server: Server) => new Ws(server)
