import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.USER_USER)
  }
}

export default new GroupQuery()
