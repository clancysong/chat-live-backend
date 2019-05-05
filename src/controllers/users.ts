import { ParameterizedContext as Context } from 'koa'
import userQuery from '../db/queries/user'
import groupQuery from '../db/queries/group'
import userGroupQuery from '../db/queries/userGroup'
import friendRequestQuery from '../db/queries/friendRequest'
import userUserQuery from '../db/queries/userUser'
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

  public async getFriendRequests(ctx: Context) {
    const requests = await friendRequestQuery.findByReceiver(ctx.user.id)

    response.success(ctx, { data: requests })
  }

  public async sendFriendRequest(ctx: Context) {
    const { receiver_id } = ctx.request.body
    const data = { requester_id: ctx.user.id, receiver_id }

    console.log(ctx.request.body)
    console.log(data)

    const existing = await friendRequestQuery.findAll(data)

    if (existing.length === 0) {
      const rs = await friendRequestQuery.addOne(data)

      response.success(ctx)
    } else {
      response.warning(ctx, { code: 102, message: 'Repeated request' })
    }
  }

  public async handleFriendRequests(ctx: Context) {
    console.log(Boolean(ctx.query.accept))
    const { requester_id, receiver_id } = await friendRequestQuery.findOne(ctx.params.id)

    if (ctx.query.accept) {
      await userUserQuery.addOne({ usera_id: requester_id, userb_id: receiver_id })
      await userUserQuery.addOne({ usera_id: receiver_id, userb_id: requester_id })
    }

    const removedRequest = await friendRequestQuery.removeOne(ctx.params.id)

    response.success(ctx, { data: removedRequest })
  }
}

export default new UserController()
