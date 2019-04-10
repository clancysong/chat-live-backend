import IO from 'socket.io'
import Koa from 'koa'
import { Server } from 'http'
import session from '../utils/session'
import userQuery from '../db/queries/user'
import groupQuery from '../db/queries/group'
import messageQuery from '../db/queries/message'
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
      const user = await session.fetch(socket.ctx)
      let groupId: number
      let groupName: string

      console.log(user.id)

      socket.on('GROUP_CONNECT', (id: number) => {
        if (groupName) socket.leave(groupName)

        groupId = id
        groupName = `group:${id}`

        socket.join(groupName)
      })

      socket.on('MESSAGE_SEND', async (content: string) => {
        const [message] = await messageQuery.addOne({ creator_id: user.id, group_id: groupId, content })

        message.creator_name = user.name

        socket.emit('MESSAGE_RECEIVE', message)
        socket.to(groupName).emit('MESSAGE_RECEIVE', message)
      })
    })
  }
}

export default Ws
export { Socket }
