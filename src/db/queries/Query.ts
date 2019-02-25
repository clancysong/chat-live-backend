import { QueryBuilder } from 'knex'
import knex from '../connection'

enum TABLE_NAME {
  USER = 'user'
}

class Query {
  private connect: () => QueryBuilder

  constructor(tableName: TABLE_NAME) {
    this.connect = () => knex(tableName)
  }

  public findOne = async (opts: {}) => {
    const rs = await this.connect().select('*').where(opts)
    if (rs.length > 0) return rs[0]
    return undefined
  }

  public addOne = async (info: {}) => {
    const rs = await this.connect().insert(info).returning('id')
    return rs[0]
  }
}

export default Query
export { TABLE_NAME }
