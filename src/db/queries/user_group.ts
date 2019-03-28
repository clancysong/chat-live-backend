import Query, { TABLE_NAME } from './Query'

class UGQuery extends Query {
  constructor() {
    super(TABLE_NAME.USER_GROUP)
  }

  public findByGroup = (id: number) => this.findAll({ group: id })

  public findByUser = (id: number) => this.findAll({ user: id })
}

export default new UGQuery()
