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
      let chatType: string
      let chatId: number
      let roomName: string

      socket.on('CHAT_CONNECT', (payload: { chatType: string; chatId: number }) => {
        if (roomName) socket.leave(roomName)

        chatType = payload.chatType
        chatId = payload.chatId
        roomName = `${chatType}:${chatId}`

        console.log('加入房间', roomName)

        socket.join(roomName)
      })

      socket.on('MESSAGE_SEND', async (content: string) => {
        const [message] = await messageQuery.addOne({
          creator_id: user.id,
          chat_type: chatType,
          chat_id: chatId,
          content
        })

        message.creator_name = user.name

        socket.emit('MESSAGE_RECEIVE', message)
        socket.to(roomName).emit('MESSAGE_RECEIVE', message)
      })
    })
  }
}

export default Ws
export { Socket }
