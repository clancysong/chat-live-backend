import Koa from 'koa'
import { Server as HttpServer } from 'http'
import { Server as WebSocketServer } from 'ws'
import bodyParser from 'koa-body'
import session from 'koa-session'
import passport from './utils/passport'
import router from './routes'
import createSockets from './sockets'

const app = new Koa()
const server = new HttpServer(app.callback())
const wss = new WebSocketServer({ server })

app.keys = ['sercet']
app.use(session(app))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser({ multipart: true }))
app.use(router.routes())

createSockets(wss)

server.listen(5000)

export default server
