import Query, { TABLE_NAME } from './Query'

class UserQuery extends Query {
  constructor() {
    super(TABLE_NAME.USER)
  }

  public findById = (id: number) => this.findOne({ id })

  public findByName = (username: string) => this.findOne({ username })
}

export default new UserQuery()
