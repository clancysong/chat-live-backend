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

  public findByGroup = (id: number) =>
    this.connect()
      .select('user_id as id', 'email', 'name', 'status')
      .leftJoin('user_group', 'user.id', 'user_group.user_id')
      .where('user_group.group_id', id)

  public findByUser = (id: number) =>
    this.connect()
      .select('userb_id as id', 'email', 'name', 'status')
      .leftJoin('user_user', 'user.id', 'user_user.userb_id')
      .where('user_user.usera_id', id)

  public updateStatus = (id: number, status: Status) => this.updateOne(id, { status })
}

export default new UserQuery()
