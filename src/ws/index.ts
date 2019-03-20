import { Server } from 'http'
import SocketIO from 'socket.io'

class Ws {
  private io: SocketIO.Server

  constructor(server: Server) {
    this.io = SocketIO(server)

    this.io.on('connection', socket => {
      console.log('新用户加入')

      socket.on('disconnect', () => {
        console.log('断开连接')
      })

      socket.on('test', (data: any) => {
        console.log(data)
      })
    })
  }
}

export default (server: Server) => new Ws(server)
