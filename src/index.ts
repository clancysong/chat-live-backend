import Koa from 'koa'
import compose from 'koa-compose'
import bodyParser from 'koa-body'
import session from 'koa-session'
import { Server as HttpServer } from 'http'
import { Server as WebSocketServer } from 'ws'
import router from './routes'
import createSockets from './sockets'

const app = new Koa()
const server = new HttpServer(app.callback())
const wss = new WebSocketServer({ server })

const middleware = compose([bodyParser({ multipart: true }), router.routes()])

app.keys = ['newest secret key', 'older secret key']

app.use(session(app))
app.use(middleware)

createSockets(wss)

server.listen(5000)

export default server
