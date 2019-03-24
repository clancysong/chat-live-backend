import { ParameterizedContext as Context } from 'koa'
import userQuery from '../db/queries/user'
import groupQuery from '../db/queries/group'
import response from '../utils/response'
import session from '../utils/session'
import User from '../models/User'

class UserController {
  public async getUserInfo(ctx: Context) {
    const user: User = await session.fetch(ctx)
    user.groupsInfo = await groupQuery.findByIds(user.groups)

    response.success(ctx, user)
  }
}

export default new UserController()
