import { ParameterizedContext as Context } from 'koa'
import userQuery from '../db/queries/user'
import response from '../utils/response'

class UserController {
  public async getUserById(ctx: Context) {
    const user = await userQuery.findById(ctx.params.id)
    if (user) response.data(ctx, user)
    else response.error(ctx, 'The user does not exits')
  }

  public async addUser(ctx: Context) {
    const reqBody = ctx.request.body
    const user = await userQuery.findByName(reqBody.name)

    if (user) {
      response.error(ctx, 'The name already exists')
    } else {
      await userQuery.addOne(reqBody)
      response.message(ctx, 'User added successfully')
    }
  }
}

export default new UserController()
