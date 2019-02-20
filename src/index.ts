import Koa from 'koa'
import compose from 'koa-compose'
import bodyParser from 'koa-body'
import { Server as HttpServer } from 'http'
import { Server as WebSocketServer } from 'ws'
import router from './routes'
import session from './utils/session'
import createSockets from './sockets'

const app = new Koa()
const server = new HttpServer(app.callback())
const wss = new WebSocketServer({ server })

const middleware = compose([bodyParser({ multipart: true }), router.routes()])

app.use(session(app))
app.use(middleware)

createSockets(wss)

server.listen(5000)

export default server
