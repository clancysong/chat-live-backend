import { ParameterizedContext as Context } from 'koa'
import getUuid from 'uuid'
import userQuery from '../db/queries/user'
import groupQuery from '../db/queries/group'
import userGroupQuery from '../db/queries/userGroup'
import friendRequestQuery from '../db/queries/friendRequest'
import userUserQuery from '../db/queries/userUser'
import privateChatQuery from '../db/queries/privateChat'
import messageQuery from '../db/queries/message'
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

  public async getFriends(ctx: Context) {
    const friends = await userQuery.findByUser(ctx.user.id)

    response.success(ctx, { data: friends })
  }

  public async removeFriend(ctx: Context) {
    await userUserQuery.removeAll({ usera_id: ctx.user.id, userb_id: ctx.params.id })
    await userUserQuery.removeAll({ usera_id: ctx.params.id, userb_id: ctx.user.id })

    response.success(ctx)
  }

  public async getFriendRequests(ctx: Context) {
    const requests = await friendRequestQuery.findByReceiver(ctx.user.id)

    response.success(ctx, { data: requests })
  }

  public async sendFriendRequest(ctx: Context) {
    const { receiver_id } = ctx.request.body

    const isFriend = (await userUserQuery.findAll({ usera_id: ctx.user.id, userb_id: receiver_id })).length > 0

    if (!isFriend) {
      const data = { requester_id: ctx.user.id, receiver_id }
      const existing = await friendRequestQuery.findAll(data)

      if (existing.length === 0) {
        const rs = await friendRequestQuery.addOne(data)

        response.success(ctx, { data: rs })
      } else {
        response.warning(ctx, { code: 102, message: 'Repeated request' })
      }
    } else {
      response.warning(ctx, { code: 103, message: 'Already be friend' })
    }
  }

  public async handleFriendRequests(ctx: Context) {
    const { requester_id, receiver_id } = await friendRequestQuery.findOne(ctx.params.id)

    if (ctx.query.accept === 'true') {
      await userUserQuery.addOne({ usera_id: requester_id, userb_id: receiver_id })
      await userUserQuery.addOne({ usera_id: receiver_id, userb_id: requester_id })
    }

    await friendRequestQuery.removeOne(ctx.params.id)

    const addedFriend = await userQuery.findOne(requester_id)

    response.success(ctx, { data: addedFriend })
  }

  public async createPrivateChat(ctx: Context) {
    const { receiver_id } = ctx.request.body
    const existing = await privateChatQuery.findByBoth(ctx.user.id, receiver_id)

    if (existing.length > 0) {
      response.success(ctx, { data: existing[0] })
    } else {
      const uuid = getUuid()
      await privateChatQuery.addOne({ usera_id: ctx.user.id, userb_id: receiver_id, uuid })
      await privateChatQuery.addOne({ usera_id: receiver_id, userb_id: ctx.user.id, uuid })

      const chat = await privateChatQuery.findByUuid(ctx.user.id, uuid)

      response.success(ctx, { data: chat })
    }
  }

  public async fetchPrivateChats(ctx: Context) {
    const chats = await privateChatQuery.findByUser(ctx.user.id)

    response.success(ctx, { data: chats })
  }

  public async fetchPrivateChatInfo(ctx: Context) {
    const chat = await privateChatQuery.findByUuid(ctx.user.id, ctx.params.uuid)

    if (chat) chat.messages = await messageQuery.findByPrivateChat(chat.uuid)

    response.success(ctx, { data: chat })
  }
}

export default new UserController()
