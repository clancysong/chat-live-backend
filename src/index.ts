import Koa from 'koa'
import compose from 'koa-compose'
import { Server as HttpServer } from 'http'
import { Server as WebSocketServer } from 'ws'
import routes from './routes'
import createSockets from './sockets'

const app = new Koa()
const server = new HttpServer(app.callback())
const wss = new WebSocketServer({ server })

const middleware = compose([routes])

app.use(middleware)

createSockets(wss)

server.listen(10000)

export default server
