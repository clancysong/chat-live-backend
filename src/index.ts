import Koa from 'koa'
import { Server as HttpServer } from 'http'
import SocketIO from 'socket.io'
import bodyParser from 'koa-body'
import session from 'koa-session'
import router from './routes'

const app = new Koa()
const server = new HttpServer(app.callback())

// session
app.keys = ['sercet', 'new sercet']
app.use(session({ key: 'sercet', maxAge: 7200000 }, app))

// body parser
app.use(bodyParser({ multipart: true }))

// router
app.use(router.routes())

// socket.io
const io = SocketIO(server)
io.on('connection', socket => {
  socket.on('test', data => {
    console.log(data)
  })
})

server.listen(5000)

export default server
