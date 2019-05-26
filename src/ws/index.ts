import IO from 'socket.io'
import Koa from 'koa'
import { Server } from 'http'
import session from '../utils/session'
import userQuery, { Status } from '../db/queries/user'
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
      let user: User
      let chatType: string
      let chatUuid: string
      let roomName: string
      socket.on('disconnect', async () => {
        if (user) {
          await this.comeOffline(user)
          socket.server.sockets.emit('USER_COME_OFFLINE', user)

          console.log('COME OFFLINE', user.name)
        }
      })

      socket.on('COME_ONLINE', async (id: number) => {
        if (user) {
          await this.comeOffline(user)
          socket.server.sockets.emit('USER_COME_OFFLINE', user)
        }

        user = (await userQuery.updateStatus(id, Status.online))[0]
        socket.server.sockets.emit('USER_COME_ONLINE', user)

        console.log('COME ONLINE', user.name)
      })

      socket.on('CHAT_CONNECT', (payload: { chatType: string; chatUuid: string }) => {
        if (roomName) socket.leave(roomName)

        chatType = payload.chatType
        chatUuid = payload.chatUuid
        roomName = `${chatType}:${chatUuid}`

        console.log('连接到', roomName)

        socket.join(roomName)
      })

      socket.on('MESSAGE_SEND', async (content: string) => {
        const [message] = await messageQuery.addOne({
          creator_id: user.id,
          chat_type: chatType,
          chat_uuid: chatUuid,
          content
        })

        message.creator_name = user.name

        socket.emit('MESSAGE_RECEIVE', message)
        socket.to(roomName).emit('MESSAGE_RECEIVE', message)
      })
    })
  }

  private comeOffline = (user: User) => userQuery.updateStatus(user.id, Status.offline)
}

export default Ws
export { Socket }
