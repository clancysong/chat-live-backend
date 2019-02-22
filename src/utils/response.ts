import { ParameterizedContext as Context } from 'koa'

export default {
  data(ctx: Context, data: any, status = 200) {
    ctx.status = status
    ctx.body = { status: 'success', data }
  },
  message(ctx: Context, message: string, status = 200) {
    ctx.status = status
    ctx.body = { status: 'success', message }
  },
  error(ctx: Context, message: string, status = 400) {
    ctx.status = status
    ctx.body = { status: 'error', message }
  }
}
