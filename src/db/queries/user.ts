import Query, { TABLE_NAME } from './Query'

class UserQuery extends Query {
  constructor() {
    super(TABLE_NAME.USER)
  }

  public findByEmail = (email: string) => this.findAll({ email }).first()

  public findByIds = (ids: number[]) => this.connect().whereIn('id', ids)

  public updateStatus = (id: number, status: boolean) => this.updateOne(id, { online: status })
}

export default new UserQuery()
