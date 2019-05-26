import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.MESSAGE)
  }

  public findByChannel = (uuid: string) => this.findByChat('group', uuid)

  public findByPrivateChat = (uuid: string) => this.findByChat('private_chat', uuid)

  public removeAllByChats = (type: string, uuids: string[]) =>
    this.connect()
      .delete()
      .whereIn('chat_uuid', uuids)
      .andWhere({ chat_type: type })

  private findByChat = (type: string, uuid: string) =>
    this.connect()
      .select('message.id as id', 'creator_id', 'user.name as creator_name', 'created_at', 'content')
      .from('message')
      .leftJoin('user', 'message.creator_id', 'user.id')
      .where('message.chat_type', type)
      .andWhere('message.chat_uuid', uuid)
}

export default new GroupQuery()
