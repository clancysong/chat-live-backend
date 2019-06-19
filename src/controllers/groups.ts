import { ParameterizedContext as Context } from 'koa'
import getUuid from 'uuid'
import groupQuery from '../db/queries/group'
import userQuery from '../db/queries/user'
import userGroupQuery from '../db/queries/userGroup'
import messageQuery from '../db/queries/message'
import channelQuery from '../db/queries/channel'
import wordQuery from '../db/queries/sensitiveWord'
import response from '../utils/response'
import session from '../utils/session'
import alioss from '../utils/alioss'

class GroupController {
  public async getPublicGroups(ctx: Context) {
    const groups = await groupQuery.findByType('public')

    response.success(ctx, { data: groups })
  }

  public async getGroupInfo(ctx: Context) {
    const group = await groupQuery.findByUuid(ctx.params.uuid)

    group.members = await userQuery.findByGroup(group.id)
    group.channels = await channelQuery.findAll({ group_id: group.id })

    response.success(ctx, { data: group })
  }

  public async createGroup(ctx: Context) {
    const getInviteCode = () => {
      const a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const codes = []
      const count = 6

      for (let i = 0; i < count; i++) {
        codes.push(a[Math.floor(Math.random() * a.length)])
      }

      return codes.join('')
    }

    const { name, type = 'private' } = ctx.request.body
    const [group] = await groupQuery.addOne({
      uuid: getUuid(),
      name,
      creator_id: ctx.user.id,
      type,
      invite_code: getInviteCode()
    })

    await userGroupQuery.addOne({ user_id: ctx.user.id, group_id: group.id })
    await channelQuery.addOne({ uuid: getUuid(), name: 'general', creator_id: ctx.user.id, group_id: group.id })

    response.success(ctx, { data: group })
  }

  public async removeGroup(ctx: Context) {
    const { id } = ctx.params
    const group = await groupQuery.findOne(id)
    const user = await session.fetch(ctx)

    if (user.permission_level >= 3 || group.creator_id === ctx.user.id) {
      const channels = await channelQuery.removeAll({ group_id: id })

      await messageQuery.removeAllByChats('group', channels.map((c: any) => c.uuid))

      await userGroupQuery.removeAll({ group_id: id })
      await groupQuery.removeOne(id)

      response.success(ctx, { data: group })
    } else {
      response.warning(ctx, { code: 103, message: 'Only the creator can do it' })
    }
  }

  public async updateGroupInfo(ctx: Context) {
    const { id } = ctx.params
    const { body: data } = ctx.request
    const { avatar, cover }: any = ctx.request.files

    if (avatar) {
      const { url }: any = await alioss.put(avatar)

      data.avatar = url
    }
    if (cover) {
      const { url }: any = await alioss.put(cover)

      data.cover = url
    }

    const [group] = await groupQuery.updateOne(id, data)

    response.success(ctx, { data: group })
  }

  public async fetchChannelInfo(ctx: Context) {
    const channel = await channelQuery.findByUuid(ctx.params.uuid)
    const sensitiveWords = (await wordQuery.findAll()).map((w: any) => w.content)

    channel.messages = await messageQuery.findByChannel(channel.uuid)

    channel.messages
      .map((m: any) => m.content)
      .forEach((m: any, i: number) => {
        sensitiveWords.forEach((w: string) => {
          const reg = new RegExp(w, 'g')
          if (m.indexOf(w) > -1) {
            channel.messages[i].content = m.replace(reg, '**')
          }
        })
      })

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

  public async removeMember(ctx: Context) {
    const { groupId, userId } = ctx.params

    const rs = await userGroupQuery.removeAll({ group_id: groupId, user_id: userId })

    response.success(ctx, { data: rs })
  }
}

export default new GroupController()
