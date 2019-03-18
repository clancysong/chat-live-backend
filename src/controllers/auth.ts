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
    const user = await userQuery.findOne({ email })

    if (user) {
      if (user.password === password) {
        session.save(ctx, user.id)
        response.success(ctx)
      } else {
        response.error(ctx, 'The password is incorrect')
      }
    } else {
      response.error(ctx, 'User does not exist')
    }
  }

  public async register(ctx: Context) {
    const { name, email, password } = ctx.request.body
    const user = await userQuery.findOne({ email })

    if (!user) {
      const id = await userQuery.addOne({ name, email, password })
      session.save(ctx, id)
      response.success(ctx)
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
