import Query, { TABLE_NAME } from './Query'

class PrivateChatQuery extends Query {
  constructor() {
    super(TABLE_NAME.PRIVATE_CHAT)
  }

  public findByUuid = (userId: number, uuid: string) => this.findAllWithUserName({ usera_id: userId, uuid }).first()

  public findByUser = (id: number) => this.findAllWithUserName({ 'private_chat.usera_id': id })

  public findByBoth = (id1: number, id2: number) => this.findAllWithUserName({ usera_id: id1, userb_id: id2 })

  private findAllWithUserName = (opts: {}) =>
    this.connect()
      .select('private_chat.id as id', 'uuid', 'usera_id', 'userb_id', 'user.name as userb_name')
      .leftJoin('user', 'private_chat.userb_id', 'user.id')
      .where(opts)
}

export default new PrivateChatQuery()
