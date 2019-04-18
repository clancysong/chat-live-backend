import { ParameterizedContext as Context } from 'koa'
import groupQuery from '../db/queries/group'
import userQuery from '../db/queries/user'
import userGroupQuery from '../db/queries/userGroup'
import messageQuery from '../db/queries/message'
import response from '../utils/response'

class GroupController {
  public async getJoinedGroups(ctx: Context) {
    const groups = await groupQuery.findByMember(ctx.user.id)

    response.success(ctx, groups)
  }

  public async getPublicGroups(ctx: Context) {
    const groups = await groupQuery.findByType('public')

    response.success(ctx, groups)
  }

  public async getGroupInfo(ctx: Context) {
    const group = await groupQuery.findOne(ctx.params.id)

    group.members = await userQuery.findByGroup(group.id)
    group.messages = await messageQuery.findByGroup(group.id)

    response.success(ctx, group)
  }

  public async joinGroup(ctx: Context) {
    const { group_id } = ctx.request.body
    const data = { user_id: ctx.user.id, group_id }

    const existing = await userGroupQuery.findAll(data)

    if (existing.length === 0) {
      const rs = await userGroupQuery.addOne(data)

      response.success(ctx)
    } else {
      response.error(ctx, 'Already joined the group')
    }
  }
}

export default new GroupController()
