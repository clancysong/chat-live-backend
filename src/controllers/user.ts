import { ParameterizedContext as Context } from 'koa'
import response from '../utils/response'
import session from '../utils/session'

class UserController {
  public async getUserInfo(ctx: Context) {
    const user = await session.fetch(ctx)

    response.success(ctx, user)
  }
}

export default new UserController()
