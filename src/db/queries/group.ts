import Query, { TABLE_NAME } from './Query'
import knex from '../connection'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.GROUP)
  }

  public findByCreator = (creatorId: number) => this.findAll({ creator: creatorId })

  public addMessage = (groupId: number, messageId: number) =>
    this.connect()
      .where({ id: groupId })
      .update({
        messages: knex.raw('array_append(messages, ?)', [messageId])
      })
}

export default new GroupQuery()
