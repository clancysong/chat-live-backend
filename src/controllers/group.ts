import { ParameterizedContext as Context } from 'koa'
import groupQuery from '../db/queries/group'
import userQuery from '../db/queries/user'
import response from '../utils/response'
import Group from '../models/Group'

class GroupController {
  public async getGroupInfo(id: number) {
    const group: Group = await groupQuery.findOne(id)

    console.log(group)
  }
}

export default new GroupController()
