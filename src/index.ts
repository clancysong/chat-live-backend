import Koa from 'koa'
import { Server as HttpServer } from 'http'
import bodyParser from 'koa-body'
import session from 'koa-session'
import logger from 'koa-logger'
import router from './routes'
import errorHandler from './middlewares/error-handler'
import Ws from './ws'

const app = new Koa()
const server = new HttpServer(app.callback())

// socket.io
const ws = new Ws(app, server)

// session
app.keys = ['sercet', 'new sercet']
app.use(session({ key: 'sercet', maxAge: 7200000 }, app))

// body parser
app.use(bodyParser({ multipart: true }))

// logger
app.use(logger())

// router
app.use(router.routes())

// error handler
app.use(errorHandler)

server.listen(5000)

export default server
