import response from '../utils/response'
import { Middleware } from 'koa'

const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const status = err.status || 500
    const message = err.message

    response.error(ctx, message, status)
  }
}

export default errorHandler
