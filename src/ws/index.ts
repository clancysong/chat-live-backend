import { Server } from 'http'
import Koa from 'koa'
import IO from 'socket.io'
import session from '../utils/session'

interface Socket extends IO.Socket {
  [propName: string]: any
}

class Ws {
  private io: SocketIO.Server

  constructor(app: Koa, server: Server) {
    this.io = IO(server)

    this.io.use((socket: Socket, next) => {
      const ctx = app.createContext(socket.request, socket.request.res)

      if (session.isAuthenticated(ctx)) {
        socket.ctx = ctx
        socket.user = ctx.session.user
        next()
      }
    })

    this.bindEvents()
  }

  private bindEvents() {
    this.io.on('connection', (socket: Socket) => {
      console.log(socket.user)

      socket.on('test', (data: any) => {
        console.log(data)
      })
    })
  }
}

export default Ws
