import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.MESSAGE)
  }

  public findByGroup = (id: number) => this.findByChat('group', id)

  public findByPrivateChat = (id: number) => this.findByChat('private_chat', id)

  private findByChat = (type: string, id: number) =>
    this.connect()
      .select('message.id as id', 'creator_id', 'user.name as creator_name', 'created_at', 'content')
      .from('message')
      .leftJoin('user', 'message.creator_id', 'user.id')
      .where('message.chat_type', type)
      .andWhere('message.chat_id', id)
}

export default new GroupQuery()
