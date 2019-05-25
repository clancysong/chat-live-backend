import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.CHANNEL)
  }
}

export default new GroupQuery()
