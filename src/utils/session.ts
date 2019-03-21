import { ParameterizedContext as Context } from 'koa'
import userQuery from '../db/queries/user'

export default {
  save(ctx: Context, id: number) {
    ctx.session.user = { id }
  },
  remove(ctx: Context) {
    delete ctx.session.user
  },
  async fetch(ctx: Context) {
    if (ctx.session.user) {
      const { id } = ctx.session.user
      const user = await userQuery.findOne(id)
      return user
    } else {
      return undefined
    }
  },
  isAuthenticated(ctx: Context) {
    return ctx.session.user ? true : false
  }
}
