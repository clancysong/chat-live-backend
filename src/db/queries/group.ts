import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.GROUP)
  }

  public findByCreator = (id: number) => this.findAll({ creator: id })

  public findByMember = (id: number) =>
    this.connect()
      .select('group_id as id', 'name', 'creator_id')
      .leftJoin('user_group', 'group.id', 'user_group.group_id')
      .where('user_group.user_id', id)
}

export default new GroupQuery()
