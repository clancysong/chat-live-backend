import { Middleware } from 'koa'
import response from '../utils/response'

const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const status = err.status || 500
    const message = err.message

    console.log(message)

    response.error(ctx, { message, status })
  }
}

export default errorHandler
