import Query, { TABLE_NAME } from './Query'

class PrivateChatQuery extends Query {
  constructor() {
    super(TABLE_NAME.PRIVATE_CHAT)
  }

  public findByBoth = (id1: number, id2: number) =>
    this.connect()
      .where({ usera_id: id1, userb_id: id2 })
      .orWhere({ usera_id: id2, userb_id: id1 })
}

export default new PrivateChatQuery()
