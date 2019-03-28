import Query, { TABLE_NAME } from './Query'

enum Status {
  online = 'online',
  offline = 'offline'
}

class UserQuery extends Query {
  constructor() {
    super(TABLE_NAME.USER)
  }

  public findByEmail = (email: string) => this.findAll({ email }).first()

  public findByIds = (ids: number[]) => this.connect().whereIn('id', ids)

  public updateStatus = (id: number, status: Status) => this.updateOne(id, { status })
}

export default new UserQuery()
