import Query, { TABLE_NAME } from './Query'

class PrivateChatQuery extends Query {
  constructor() {
    super(TABLE_NAME.PRIVATE_CHAT)
  }

  public findByUuid = (userId: number, uuid: string) => this.findAll({ usera_id: userId, uuid }).first()

  public findByUser = (id: number) => this.findAll({ usera_id: id })

  public findByBoth = (id1: number, id2: number) => this.findAll({ usera_id: id1, userb_id: id2 })
}

export default new PrivateChatQuery()
