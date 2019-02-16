import Koa from 'koa'
import compose from 'koa-compose'
import { Server as HttpServer } from 'http'
import { Server as WebSocketServer } from 'ws'
import routes from './routes'
import bindWebSocketEvents from './ws'

const app = new Koa()
const server = new HttpServer(app.callback())
const wss = new WebSocketServer({ server })

const middleware = compose([routes])

app.use(middleware)

bindWebSocketEvents(wss)

server.listen(10000)
