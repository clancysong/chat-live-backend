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

  public findOne = async (opts: {}) => {
    const rs = await this.connection.select('*').where(opts)
    if (rs.length > 0) return rs[0]
    return undefined
  }

  public addOne = async (info: {}) => {
    const rs = await this.connection.insert(info).returning('id')
    return rs[0]
  }
}

export default Query
export { TABLE_NAME }
