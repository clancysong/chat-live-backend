import { ParameterizedContext as Context } from 'koa'
import groupQuery from '../db/queries/group'
import userQuery from '../db/queries/user'
import messageQuery from '../db/queries/message'
import response from '../utils/response'

class GroupController {
  public async getPublicGroups(ctx: Context) {
    const groups = await groupQuery.findByType('public')

    response.success(ctx, { data: groups })
  }

  public async getGroupInfo(ctx: Context) {
    const group = await groupQuery.findOne(ctx.params.id)

    group.members = await userQuery.findByGroup(group.id)
    group.messages = await messageQuery.findByGroup(group.id)

    response.success(ctx, { data: group })
  }
}

export default new GroupController()
