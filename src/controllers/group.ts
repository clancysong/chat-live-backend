import { ParameterizedContext as Context } from 'koa'
import groupQuery from '../db/queries/group'
import userQuery from '../db/queries/user'
import messageQuery from '../db/queries/message'
import response from '../utils/response'
import Group from '../models/Group'

class GroupController {
  public async getGroups(ctx: Context) {
    const groups: Group[] = await groupQuery.findByCreator(ctx.session.user.id)

    response.success(ctx, groups)
  }

  public async getGroupInfo(ctx: Context) {
    const group: Group = await groupQuery.findOne(ctx.params.id)

    response.success(ctx, group)
  }
}

export default new GroupController()
