import { ParameterizedContext as Context } from 'koa'
import userQuery from '../db/queries/user'
import User from '../models/User'

export default {
  save(ctx: Context, user: User) {
    ctx.session.user = { id: user.id }
  },
  remove(ctx: Context) {
    ctx.session = null
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
