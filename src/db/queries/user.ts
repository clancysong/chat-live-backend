import Query, { TABLE_NAME } from './Query'

class UserQuery extends Query {
  constructor() {
    super(TABLE_NAME.USER)
  }

  public findById = (id: number) => this.findOne({ id })

  public findByName = (name: string) => this.findOne({ name })
}

export default new UserQuery()
