import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.MESSAGE)
  }

  public findByIds = (ids: number[]) => this.connect().whereIn('id', ids)
}

export default new GroupQuery()
