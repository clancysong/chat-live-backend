import { QueryBuilder } from 'knex'
import knex from '../connection'

enum TABLE_NAME {
  USER = 'user',
  GROUP = 'group'
}

class Query {
  private connect: () => QueryBuilder

  constructor(tableName: TABLE_NAME) {
    this.connect = () => knex(tableName)
  }

  public findOne = (id: number) => this.connect().where({ id }).first()

  public findAll = (opts: {} = {}) => this.connect().where(opts)

  public addOne = (newOne: {}) =>
    this.connect()
      .insert(newOne)
      .returning('*')

  public removeOne = (id: number) =>
    this.connect()
      .delete()
      .where({ id })
      .returning('*')

  public updateOne = (id: number, newOne: {}) =>
    this.connect()
      .update(newOne)
      .where({ id })
      .returning('*')
}

export default Query
export { TABLE_NAME }
