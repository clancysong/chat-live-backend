import { ParameterizedContext as Context } from 'koa'
import userQuery from '../db/queries/user'
import session from '../utils/session'
import response from '../utils/response'

class AuthController {
  public async authorize(ctx: Context) {
    if (session.isAuthenticated(ctx)) {
      const user = await session.fetch(ctx)
      response.success(ctx, user)
    } else {
      response.error(ctx, 'Authentication failed', 401)
    }
  }

  public async login(ctx: Context) {
    const { email, password } = ctx.request.body
    const rs = await userQuery.findByEmail(email)

    if (rs.length > 0) {
      const user = rs[0]

      if (user.password === password) {
        session.save(ctx, user.id)
        response.success(ctx, user)
      } else {
        response.error(ctx, 'The password is incorrect')
      }
    } else {
      response.error(ctx, 'User does not exist')
    }
  }

  public async register(ctx: Context) {
    const { name, email, password } = ctx.request.body
    const rs = await userQuery.findByEmail(email)

    if (rs.length === 0) {
      const user = await userQuery.addOne({ name, email, password })

      session.save(ctx, user)
      response.success(ctx, user)
    } else {
      response.error(ctx, 'The name already exists')
    }
  }

  public logout(ctx: Context) {
    session.remove(ctx)
    response.success(ctx)
  }
}

export default new AuthController()
