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
    console.log(opts)
    const rs = await this.connection.select('*').where(opts)
    console.log(rs)
    if (rs && rs.length) return rs[0]
    else return false
  }

  public addOne = (info: {}) => this.connection.insert(info)
}

export default Query
export { TABLE_NAME }
