import { ParameterizedContext as Context } from 'koa'
import userQuery from '../db/queries/user'
import session from '../utils/session'
import response from '../utils/response'

class AuthController {
  public async authorize(ctx: Context) {
    const user = await session.fetch(ctx)
    response.success(ctx, user)
  }

  public async login(ctx: Context) {
    const { email, password } = ctx.request.body
    const user = await userQuery.findByEmail(email)

    if (user) {
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
    const existUser = await userQuery.findByEmail(email)

    if (!existUser) {
      const user = await userQuery.addOne({ name, email, password })

      session.save(ctx, user.id)
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
