import IO from 'socket.io'
import Koa from 'koa'
import { Server } from 'http'
import session from '../utils/session'
import userQuery from '../db/queries/user'
import groupQuery from '../db/queries/group'
import messageQuery from '../db/queries/message'
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

  public broadcast = (eventType: string, payload: any) => {
    this.io.sockets.emit(eventType, payload)
  }

  private bindEvents() {
    this.io.on('connection', async (socket: Socket) => {
      const user: User = await session.fetch(socket.ctx)
      let groupId: number

      console.log(`${user.name} 加入连接`)

      socket.on(eventTypes.on.connectToGroup, (id: number) => {
        groupId = id
      })

      socket.on(eventTypes.on.sendMessage, async (content: string) => {
        const message = await messageQuery.addOne({ creator: user.id, content})
        const group = await groupQuery.addMessage(groupId, message.id)
        console.log(group)
      })

      socket.on('disconnect', async () => {
        console.log(`${user.name} 断开连接`)
      })
    })
  }
}

export default Ws
export { Socket }
