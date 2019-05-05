import { ParameterizedContext as Context } from 'koa'
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

  public async getFriendRequests(ctx: Context) {
    const request = await friendRequestQuery.findAll({ receiver_id: ctx.user.id })

    response.success(ctx, { data: request })
  }

  public async sendFriendRequest(ctx: Context) {
    const { receiver_id } = ctx.request.body
    const data = { requester_id: ctx.user.id, receiver_id }

    const existing = await friendRequestQuery.findAll(data)

    if (existing.length === 0) {
      const rs = await friendRequestQuery.addOne(data)

      response.success(ctx)
    } else {
      response.warning(ctx, { code: 102, message: 'Repeated request' })
    }
  }

  public async handleFriendRequests(ctx: Context) {
    const { requester_id, receiver_id } = await friendRequestQuery.findOne(ctx.params.id)

    if (ctx.query.accept) {
      await userUserQuery.addOne({ usera_id: requester_id, userb_id: receiver_id })
    }

    const removedRequest = await friendRequestQuery.removeOne(ctx.params.id)

    response.success(ctx, { data: removedRequest })
  }
}

export default new UserController()
