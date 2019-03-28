import { ParameterizedContext as Context } from 'koa'
import groupQuery from '../db/queries/group'
import ugQuery from '../db/queries/user_group'
import response from '../utils/response'
import session from '../utils/session'
import User from '../models/User'
import Group from '../models/Group'

class UserController {
  public async getUserInfo(ctx: Context) {
    const user: User = await session.fetch(ctx)
    const groups: Group[] = await ugQuery.findByUser(user.id)

    user.groupsInfo = await groupQuery.findByIds(groups.map(group => group.id))

    response.success(ctx, user)
  }
}

export default new UserController()
