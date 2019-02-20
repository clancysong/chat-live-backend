import Koa from 'koa'
import session from 'koa-session'

const config = {
  key: 'chat-live',
  signed: false
}

const middleware = (app: Koa) => session(config, app)

export default middleware
