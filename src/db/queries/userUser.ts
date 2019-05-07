import Query, { TABLE_NAME } from './Query'

class UserUserQuery extends Query {
  constructor() {
    super(TABLE_NAME.USER_USER)
  }
}

export default new UserUserQuery()
