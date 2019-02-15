import Koa from 'koa'
import compose from 'koa-compose'
import websocket from 'koa-websocket'
import routes from './routes'
import wsRoute from './ws'

const app = websocket(new Koa())

const middleware = compose([routes])

app.use(middleware)

app.ws.use(wsRoute)

app.listen(10000)
