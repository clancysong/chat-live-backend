import { ParameterizedContext as Context } from 'koa'
import userQuery from '../db/queries/user'
import groupQuery from '../db/queries/group'
import session from '../utils/session'
import response from '../utils/response'

class AuthController {
  public async login(ctx: Context) {
    const { email, password } = ctx.request.body
    const user = await userQuery.findByEmail(email)

    if (user) {
      if (user.password === password) {
        await session.save(ctx, user)
        response.success(ctx, { data: user })
      } else {
        response.error(ctx, { message: 'The password is incorrect' })
      }
    } else {
      response.error(ctx, { message: 'User does not exist' })
    }
  }

  public async register(ctx: Context) {
    const { name, email, password } = ctx.request.body
    const existUser = await userQuery.findByEmail(email)

    if (!existUser) {
      const user = await userQuery.addOne({ name, email, password })

      session.save(ctx, user.id)
      response.success(ctx, { data: user })
    } else {
      response.error(ctx, { message: 'The name already exists' })
    }
  }

  public logout(ctx: Context) {
    session.remove(ctx)
    response.success(ctx)
  }
}

export default new AuthController()
