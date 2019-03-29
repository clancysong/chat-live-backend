import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.MESSAGE)
  }

  public findByGroup = (id: number) =>
    this.connect()
      .select('message.id as id', 'creator_id', 'user.name as creator_name', 'group_id', 'created_at', 'content')
      .from('message')
      .leftJoin('user', 'message.creator_id', 'user.id')
      .where('message.group_id', id)
}

export default new GroupQuery()
