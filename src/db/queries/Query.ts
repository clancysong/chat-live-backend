import { QueryBuilder } from 'knex'
import knex from '../connection'

enum TABLE_NAME {
  USER = 'user'
}

class Query {
  private connection: QueryBuilder

  constructor(tableName: TABLE_NAME) {
    this.connection = knex(tableName)
  }

  public findOne = async (opts: {}) =>
    await this.connection
      .select('*')
      .where(opts)
      .first()

  public addOne = (info: {}) => this.connection.insert(info)
}

export default Query
export { TABLE_NAME }
