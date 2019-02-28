import { ParameterizedContext as Context } from 'koa'

export default {
  success(ctx: Context, data: any = {}, status = 200) {
    ctx.status = status
    ctx.body = { status: 'success', data }
  },
  error(ctx: Context, message: string, status = 400) {
    ctx.status = status
    ctx.body = { status: 'error', message }
  }
}
