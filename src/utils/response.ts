import { ParameterizedContext as Context } from 'koa'

interface Params {
  status?: number
  code?: number
  data?: any
  message?: string
}

export default {
  success(ctx: Context, params: Params = {}) {
    const { status = 200, code = 100, data = {} } = params

    ctx.status = status
    ctx.body = { code, data }
  },
  warning(ctx: Context, params: Params = {}) {
    const { status = 200, code = 101, data = {} } = params

    ctx.status = status
    ctx.body = { code, data }
  },
  error(ctx: Context, params: Params = {}) {
    const { status = 400, code = 0, message = '' } = params

    ctx.status = status
    ctx.body = { code, message }
  }
}
