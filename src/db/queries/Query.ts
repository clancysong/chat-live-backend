import { QueryBuilder } from 'knex'
import knex from '../connection'

enum TABLE_NAME {
  USER = 'user',
  GROUP = 'group',
  USER_GROUP = 'user_group',
  MESSAGE = 'message',
  USER_USER = 'user_user',
  FRIEND_REQUEST = 'friend_request',
  PRIVATE_CHAT = 'private_chat'
}

class Query {
  protected connect: () => QueryBuilder

  constructor(tableName: TABLE_NAME) {
    this.connect = () => knex(tableName)
  }

  public findOne = (id: number) =>
    this.connect()
      .where({ id })
      .first()

  public findByIds = (ids: number[]) => this.connect().whereIn('id', ids)

  public findAll = (opts: object) => this.connect().where(opts)

  public addOne = (newOne: {}) =>
    this.connect()
      .insert(newOne)
      .returning('*')

  public removeOne = (id: number) =>
    this.connect()
      .delete()
      .where({ id })
      .returning('*')

  public removeAll = (opts: object) =>
    this.connect()
      .delete()
      .where(opts)
      .returning('*')

  public updateOne = (id: number, newOne: {}) =>
    this.connect()
      .update(newOne)
      .where({ id })
      .returning('*')
}

export default Query
export { TABLE_NAME }
