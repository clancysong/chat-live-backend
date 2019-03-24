import { ParameterizedContext as Context } from 'koa'
import groupQuery from '../db/queries/group'
import userQuery from '../db/queries/user'
import messageQuery from '../db/queries/message'
import response from '../utils/response'
import Group from '../models/Group'

class GroupController {
  public async getGroups(ctx: Context) {
    const groups: Group[] = await groupQuery.findByCreator(ctx.session.user.id)

    const data = await Promise.all(
      groups.map(async group => {
        group.membersInfo = await userQuery.findByIds(group.members)
        group.messagesInfo = await messageQuery.findByIds(group.messages)
        return group
      })
    )

    response.success(ctx, data)
  }

  public async getGroupInfo(ctx: Context) {
    const group: Group = await groupQuery.findOne(ctx.params.id)

    group.membersInfo = await userQuery.findByIds(group.members)
    group.messagesInfo = await messageQuery.findByIds(group.messages)

    response.success(ctx, group)
  }
}

export default new GroupController()
