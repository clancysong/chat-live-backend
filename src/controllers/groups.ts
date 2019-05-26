import { ParameterizedContext as Context } from 'koa'
import getUuid from 'uuid'
import groupQuery from '../db/queries/group'
import userQuery from '../db/queries/user'
import userGroupQuery from '../db/queries/userGroup'
import messageQuery from '../db/queries/message'
import channelQuery from '../db/queries/channel'
import response from '../utils/response'

class GroupController {
  public async getPublicGroups(ctx: Context) {
    const groups = await groupQuery.findByType('public')

    response.success(ctx, { data: groups })
  }

  public async getGroupInfo(ctx: Context) {
    const group = await groupQuery.findByUuid(ctx.params.uuid)

    group.members = await userQuery.findByGroup(group.id)
    group.channels = await channelQuery.findAll({ group_id: group.id })
    // group.messages = await messageQuery.findByGroup(group.uuid)

    response.success(ctx, { data: group })
  }

  public async createPrivateGroup(ctx: Context) {
    const { name } = ctx.request.body
    const [group] = await groupQuery.addOne({ uuid: getUuid(), name, creator_id: ctx.user.id, type: 'private' })

    await userGroupQuery.addOne({ user_id: ctx.user.id, group_id: group.id })

    response.success(ctx, { data: group })
  }

  public async fetchChannelInfo(ctx: Context) {
    const channel = await channelQuery.findByUuid(ctx.params.uuid)

    channel.messages = await messageQuery.findByChannel(channel.uuid)

    response.success(ctx, { data: channel })
  }

  public async createChannel(ctx: Context) {
    const { name } = ctx.request.body
    const { groupId } = ctx.params

    const [channel] = await channelQuery.addOne({ uuid: getUuid(), name, creator_id: ctx.user.id, group_id: groupId })

    response.success(ctx, { data: channel })
  }

  public async removeChannel(ctx: Context) {
    const [channel] = await channelQuery.removeOne(ctx.params.id)

    await messageQuery.removeAll({ chat_type: 'group', chat_uuid: channel.uuid })

    response.success(ctx, { data: channel })
  }
}

export default new GroupController()
