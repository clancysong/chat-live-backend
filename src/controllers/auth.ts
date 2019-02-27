import { ParameterizedContext as Context } from 'koa'
import userQuery from '../db/queries/user'
import session from '../utils/session'
import response from '../utils/response'

class AuthController {
  public async login(ctx: Context) {
    const { email, password } = ctx.request.body
    const user = await userQuery.findOne({ email })

    if (user) {
      if (user.password === password) {
        session.save(ctx, user.id)
        response.message(ctx, 'Logged in successfully')
      } else {
        response.error(ctx, 'The password is incorrect')
      }
    } else {
      response.error(ctx, 'User does not exist')
    }
  }

  public async register(ctx: Context) {
    const { name, email,  password } = ctx.request.body
    const user = await userQuery.findByName(email)

    if (!user) {
      const id = await userQuery.addOne({ name, email, password })
      session.save(ctx, id)
      response.message(ctx, 'Registered successfully')
    } else {
      response.error(ctx, 'The name already exists')
    }
  }

  public logout(ctx: Context) {
    session.remove(ctx)
    response.message(ctx, 'Logout successful')
  }
}

export default new AuthController()
