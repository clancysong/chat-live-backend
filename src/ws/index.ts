import { Server } from 'http'
import Koa from 'koa'
import IO from 'socket.io'
import session from '../utils/session'
import userQuery from '../db/queries/user'
import eventTypes from './eventTypes'
import User from '../models/User'
import Group from '../models/Group'

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
    this.io.on('connection', async (socket: Socket) => {
      const user: User = await session.fetch(socket.ctx)

      console.log(`${user.name} 加入连接`)

      socket.server.sockets.emit(eventTypes.emit.userComesOnline, user.id)

      socket.on(eventTypes.on.connectToGroup, (group: Group) => {
        console.log(`${user.name} 连接到群组 ${group.name}`)
      })

      socket.on('disconnect', async () => {
        console.log(`${user.name} 断开连接`)

        socket.server.sockets.emit(eventTypes.emit.userComesOffline, user.id)
        await userQuery.updateStatus(user.id, false)
      })
    })
  }
}

export default Ws
