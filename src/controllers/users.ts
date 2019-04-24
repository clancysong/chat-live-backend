import { ParameterizedContext as Context } from 'koa'
import groupQuery from '../db/queries/group'
import userGroupQuery from '../db/queries/userGroup'
import response from '../utils/response'
import session from '../utils/session'

class UserController {
  public async getUserInfo(ctx: Context) {
    const user = await session.fetch(ctx)

    response.success(ctx, { data: user })
  }

  public async getJoinedGroups(ctx: Context) {
    const groups = await groupQuery.findByMember(ctx.user.id)

    response.success(ctx, { data: groups })
  }

  public async joinGroup(ctx: Context) {
    const { group_id } = ctx.request.body
    const data = { user_id: ctx.user.id, group_id }

    const existing = await userGroupQuery.findAll(data)

    if (existing.length === 0) {
      const rs = await userGroupQuery.addOne(data)

      response.success(ctx)
    } else {
      response.warning(ctx, { code: 102, message: 'Already joined the group' })
    }
  }
}

export default new UserController()
