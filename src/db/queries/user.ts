import Query, { TABLE_NAME } from './Query'

class UserQuery extends Query {
  constructor() {
    super(TABLE_NAME.USER)
  }

  public findByEmail = (email: string) => this.findAll({ email })
}

export default new UserQuery()
